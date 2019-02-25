
<template>
  <v-container class="pa-0">
    <v-layout row wrap class="pa-0">
      <v-flex xs12 md8 class="px-0 pt-4">
        <v-system-bar>
          <v-toolbar-title class="subheading font-weight-bold">
            Disciplinas disponíveis
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items v-if="deveExibirOFiltroDeTurmas" 
            id="filtro-de-turmas" 
            class="hidden-sm-and-down">

            <filtro-de-turma>
            </filtro-de-turma>
          </v-toolbar-items>
        </v-system-bar>
      </v-flex>

      <v-flex xs12 md8>
        <disciplinas-disponiveis>
        </disciplinas-disponiveis>
      </v-flex>

      <v-flex xs12 md4>
        <v-container class="px-2">
          <salvar-alteracoes>
          </salvar-alteracoes>

          <mini-grade-de-horario>
          </mini-grade-de-horario>
        </v-container>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Vue, Prop } from 'vue-property-decorator';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import { Container } from 'typescript-ioc';
import { ChatMixin } from '@/mixin/ChatMixin';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { StoreNamespaces } from '@/store';
import { namespace, Action } from 'vuex-class';
import { FeatureToggleGetterTypes } from 'componente-frontend-core/store/featureToggle/getters';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { MiniGradeActionTypes } from '@/store/miniGrade/actions';
import { GlobalActionTypes } from '@/store/actions';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import {
  PreparacaoDeTurmasService,
} from '@/services/alteracao/PreparacaoDeTurmasService';
import {
  AcessarAlteracaoService,
} from '@/services/alteracao/AcessarAlteracaoService';
import store from '@/store';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import DisciplinasDisponiveis from '@/components/alteracao/DisciplinasDisponiveis.vue';
import SalvarAlteracoes from '@/components/alteracao/SalvarAlteracoes.vue';
import MiniGradeDeHorario from '@/components/alteracao/MiniGradeDeHorario.vue';
import FiltroDeTurma from '@/components/alteracao/FiltroDeTurma.vue';

const autorizacao = namespace(StoreNamespaces.AUTORIZACAO);
const alteracao = namespace(StoreNamespaces.ALTERACAO);
const miniGrade = namespace(StoreNamespaces.MINI_GRADE);

@Component({
  components: {
    DisciplinasDisponiveis,
    SalvarAlteracoes,
    MiniGradeDeHorario,
    FiltroDeTurma,
  },
})
export default class Alteracao extends Mixins<ChatMixin>(ChatMixin) {

  private get codigoDoAluno(): number {
    return this.usuarioLogado.codigo || 0;
  }

  private get preparacaoDeTurmasService(): PreparacaoDeTurmasService {
    return Container.get(PreparacaoDeTurmasService);
  }

  public deveExibirOFiltroDeTurmas: boolean = false;

  @autorizacao.State
  public usuarioLogado!: UsuarioIdentity;

  @alteracao.Action(AlteracaoActionTypes.PREPARANDO_TURMAS)
  public preparandoTurmas!: () => Promise<void>;

  @alteracao.Action(AlteracaoActionTypes.PREPARACAO_FINALIZADA)
  public preparacaoFinalizada!: () => Promise<void>;

  @miniGrade.Action(MiniGradeActionTypes.CARREGAR_MINI_GRADE)
  public carregarMiniGrade!: (horarios: HorarioDaMiniGrade[]) => Promise<void>;

  @Action(GlobalActionTypes.DEFINIR_LINK_PARA_VOLTAR)
  public definirLinkParaVoltar!: (link: string) => Promise<void>;

  @alteracao.Action(AlteracaoActionTypes.LIMPAR_ALTERACAO)
  private limparAlteracoes!: () => Promise<void>;

  public async beforeRouteEnter(to: any, from: any, next: any) {
    const codigoDoAluno = (store.state as any).autorizacao.usuarioLogado.codigo;

    try {
      const response = await Container.get(AcessarAlteracaoService).processar(codigoDoAluno);

      if (response.data.statusEstaLiberadoParaAlteracao) {
        next();
      } else {
        next('/Resumo');
      }
    } catch {
      next('/Resumo');
    }
  }

  public async created() {
    await this.definirLinkParaVoltar('/Resumo');
    await this.limparAlteracoes();
    await this.setarExibicaoDoFiltroDeTurmas();

    this.preparandoTurmas();
    await this.prepararTurmas();
    this.preparacaoFinalizada();
  }


  public async setarExibicaoDoFiltroDeTurmas(): Promise<void> {
    this.deveExibirOFiltroDeTurmas = await this.$features
      .habilitado(ToggleConstants.HabilitarFiltroDeTurmas);
  }

  private async prepararTurmas(): Promise<void> {
    const response = await this.preparacaoDeTurmasService.processar(this.codigoDoAluno);
    this.carregarMiniGrade(response.data.horarios);
  }

}
</script>