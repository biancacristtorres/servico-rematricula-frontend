<template>
  <v-container 
    class="pt-0 pb-0">

    <v-layout id="componente-condicoes-especiais">
      <v-flex xs12>
        <v-card flat>
          <v-card-title primary-title class="text-xs-left pb-0 body-2">
            Gostaria de cursar em turmas:
          </v-card-title>

          <v-card-text class="py-0 px-0">
            <v-container fluid class="px-3 pt-0">

              <template v-for="condicao in condicoesEspeciais">

                <v-checkbox 
                  :key="condicao" 
                  :id="`condicao-especial-${ condicao }`" 
                  :value="condicao"
                  :disabled="deveEstarDesabilitado"
                  v-model="condicoesEspeciaisASolicitar"
                  class="condicoes-especiais" 
                  color="primary" 
                  hide-details>

                  <div slot="label" class="body-1 black--text">
                    {{ nomeDaCondicao(condicao) }}
                  </div>
                </v-checkbox>
              </template>

            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';
  import { StoreNamespaces } from '@/store';
  import { ActionTypes } from '@/store/condicaoEspecial/actions';
  import { GetterTypes } from '@/store/condicaoEspecial/getters';
  import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';
  import { log } from 'util';
  import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
  import { AutorizacaoActionTypes } from 'componente-frontend-core/store/autorizacao/actions';

  const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);
  const condicaoEspecialNamespace = namespace(StoreNamespaces.CONDICAOESPECIAL);

  @Component({})
  export default class SelecaoDeCondicaoEspecial extends Vue {

    public condicoesEspeciaisASolicitar: CondicaoEspecial[] = [];

    @Prop()
    public quantidadeDeDisciplinasComInteresse!: number;

    private get possuiDisciplinasComInteresse(): boolean {
      return this.quantidadeDeDisciplinasComInteresse === 0;
    }

    private get deveEstarDesabilitado(): boolean {
      if (this.possuiDisciplinasComInteresse) {
        this.condicoesEspeciaisASolicitar = [];
      }

      return this.possuiDisciplinasComInteresse;
    }

    @autorizacaoNamespace.State
    public usuarioLogado!: UsuarioIdentity;

    @condicaoEspecialNamespace.Action(ActionTypes.PREENCHER_CONDICOES_ESPECIAIS_SOLICITADAS)
    public preencherCondicoesEspeciaisSolicitadas!: (codigoDoAluno: number) => Promise < void > ;

    @condicaoEspecialNamespace.Getter(GetterTypes.CONDICOES_ESPECIAIS)
    public condicoesEspeciais!: CondicaoEspecial[];

    @condicaoEspecialNamespace.State
    public solicitadas!: CondicaoEspecial[];

    public mounted() {
      this.preencherCondicoesEspeciaisSolicitadas(this.usuarioLogado.codigo || 0)
        .then(this.mapearCondicoesSolicitadas);
    }

    public mapearCondicoesSolicitadas() {
      this.condicoesEspeciaisASolicitar = this.solicitadas;
    }

    public nomeDaCondicao(condicao: CondicaoEspecial): string {
      switch (condicao) {
        case CondicaoEspecial.TurmasEspecias:
          return 'Turmas Especiais';
        case CondicaoEspecial.CampusDiferentes:
          return 'Campus Diferentes';
        case CondicaoEspecial.TurnosDiferentes:
          return 'Turnos Diferentes';
        default:
          return '';
      }
    }

    @Watch('condicoesEspeciaisASolicitar')
    public condicoesEspeciaisASolicitarWatch(condicoes: CondicaoEspecial[]) {
      this.$emit('condicaoSolicitada', condicoes);
    }
  }
</script>