<template>
  <v-container class="grey--text" fluid>
    <v-layout wrap align-center row reverse justify-center fill-height>

      <v-flex class="text-xs-center pt-5" xs12 md6>
        <v-layout wrap row fill-height
          :justify-center="$vuetify.breakpoint.smAndDown" 
          :justify-start="$vuetify.breakpoint.mdAndUp">
          <v-flex class="coluna" xs12>
            <v-img id="imagem-erro" class="text-xs-center coluna" :src="getImgUrl"/>
          </v-flex>
        </v-layout>

      </v-flex>

      <v-flex xs12 md6>
        <v-layout wrap row fill-height
          :justify-center="$vuetify.breakpoint.smAndDown"
          :justify-end="$vuetify.breakpoint.mdAndUp" >

          <v-flex class="coluna" xs12>
            <p id="titulo-erro" class="display-2 text-xs-left">
              {{ titulo }}
            </p>
          </v-flex>

          <v-flex class="coluna" xs12>
            <div id="texto-erro" class="pt-3 texto subheading text-xs-left">
              {{ texto }}
            </div>
          </v-flex>

          <v-flex v-if="deveRedirecionarParaOSOL" 
            class="coluna" 
            :class="classeContainerBotao"
            xs12>
            <v-btn id="retornar-ao-sol" :href="linkDoSOL" class="mt-3 ml-0 btn-retornar-ao-sol" color="primary">
              Retornar ao SOL
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Instituicao } from '@/common/enum/Instituicao';
import { Marca } from '@/model/Marca';
import { StoreNamespaces } from '@/store';
import { MarcaGetterTypes } from '@/store/marca/getters';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { namespace } from 'vuex-class';

const aluno = namespace(StoreNamespaces.ALUNO);
const marca = namespace(StoreNamespaces.MARCA);

@Component({})
export default class Erro extends Vue {

  public get linkDoSOL(): string {
    return this.obterLinkDoSol(this.informacoesAluno.codigoInstituicao);
  }

  public get getImgUrl() {
    try {
      return require(`./assets/erro/${ this.imagem }.svg`);
    } catch {
      return '';
    }
  }

  public get classeContainerBotao() {
    return this.$vuetify.breakpoint.smAndDown ? 'text-xs-center' : '';
  }

  @aluno.State
  public informacoesAluno!: InformacoesAluno;

  @marca.Getter(MarcaGetterTypes.OBTER_LINK_DO_SOL)
  public obterLinkDoSol!: (instituicao: Instituicao) => string;

  @Prop()
  private titulo!: string;

  @Prop()
  private texto!: string;

  @Prop()
  private imagem!: string;

  @Prop({ default: true })
  private deveRedirecionarParaOSOL!: boolean;

}
</script>

<style lang="stylus" scoped>
.btn-retornar-ao-sol
  min-width: 280px
.coluna
  max-width: 416px
</style>