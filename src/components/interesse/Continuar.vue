<template>
  <v-container class="pt-3">
    <v-layout class="mt-0">
      <v-flex xs12>
        <v-btn id="submeter-interesse" @click.native="continuar" block large color="primary" :loading="carregando">
          Continuar
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { InteresseActionTypes } from '@/store/interesse/actions';
import { ActionTypes } from '@/store/condicaoEspecial/actions';
import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';
import { ManifestarInteresseRequest } from '@/store/interesse/request/ManifestarInteresseRequest';
import { CondicaoEspecialRequest } from '@/store/condicaoEspecial/request/CondicaoEspecialRequest';
import { AutorizacaoActionTypes } from 'componente-frontend-core/store/autorizacao/actions';

const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);
const interesseNamespace = namespace(StoreNamespaces.INTERESSE);
const condicaoEspecialNamespace = namespace(StoreNamespaces.CONDICAOESPECIAL);

@Component({})
export default class Continuar extends Vue {

  @autorizacaoNamespace.State
  public usuarioLogado!: UsuarioIdentity;

  @Prop()
  public condicoes!: CondicaoEspecial[];

  @Prop()
  public disciplinas!: DisciplinaComInteresse[];

  @interesseNamespace.Action(InteresseActionTypes.MANIFESTAR_INTERESSE)
  public manifestarInteresse!: (request: ManifestarInteresseRequest) => Promise <void>;

  @condicaoEspecialNamespace.Action(ActionTypes.SOLICITAR_CONDICOES_ESPECIAIS)
  public solicitarCondicoesEspeciais!: (request: CondicaoEspecialRequest) => Promise <void>;
  private carregando: boolean = false;

  public async continuar() {
    this.submeterFormularios().then(this.aoSubmeterFormularios);
  }

  public submeterFormularios(): Promise<any> {
    this.carregando = true;

    return Promise.all([
      this.submeterInteresse(),
      this.submeterCondicoesEspeciais(),
    ]);
  }

  public async submeterInteresse() {
    const request = new ManifestarInteresseRequest(this.usuarioLogado.codigo || 0, this.disciplinas);
    await this.manifestarInteresse(request);
  }

  public async submeterCondicoesEspeciais() {
    const request = new CondicaoEspecialRequest(this.usuarioLogado.codigo || 0, this.condicoes);
    await this.solicitarCondicoesEspeciais(request);
  }

  public aoSubmeterFormularios(): void {
    this.carregando = false;
    this.redirecionar();
  }

  public redirecionar() {
    this.$router.push('/AguardandoRematricula');
  }
}
</script>