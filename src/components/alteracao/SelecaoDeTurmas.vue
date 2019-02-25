<template>
  <div class="grey lighten-4">

    <div v-if="prontoParaExibicao" :id="`turmas-disciplina-${ codigoDaDisciplina }`">

      <template v-if="possuiTurmas || possuiTurmasEquivalentes || possuiTurmasEspeciais">
        <nenhuma-opcao @remover-turma="aoRemoverTurma" :codigoDaDisciplina="codigoDaDisciplina"
          v-if="!possuiEquivalenciaDoisPorUm && !toggleNovoSelecionadorHabilitado">
        </nenhuma-opcao>

        <feedback-disciplina :codigoDaDisciplina="codigoDaDisciplina" 
          :possuiEquivalenciaDoisPorUm="possuiEquivalenciaDoisPorUm">
        </feedback-disciplina>

        <template v-if="possuiTurmas">
          <toolbar-de-turma></toolbar-de-turma>
          <turmas 
            id="disciplina-turmas"
            @alterar-turma="aoAlterarTurma"
            :codigoDaDisciplina="codigoDaDisciplina" 
            :nomeDaDisciplina="disciplina.nome"
            :possuiEquivalenciaDoisPorUm="possuiEquivalenciaDoisPorUm"
            :turmas="turmas">
          </turmas>
        </template>

        <template v-if="possuiTurmasEquivalentes">
          <toolbar-de-turma-equivalente></toolbar-de-turma-equivalente>
          <turmas 
            id="disciplina-turmas-equivalentes"
            @alterar-turma="aoAlterarTurma"
            :codigoDaDisciplina="codigoDaDisciplina" 
            :nomeDaDisciplina="disciplina.nome"
            :eDisciplinaEletiva="disciplina.eDisciplinaEletiva"
            :eDisciplinaEquivalente="true"
            :possuiEquivalenciaDoisPorUm="possuiEquivalenciaDoisPorUm"
            :turmas="turmasEquivalentes">
          </turmas>
        </template>

        <template v-if="possuiTurmasEspeciais">
          <toolbar-de-turma-especiais></toolbar-de-turma-especiais>
          <turmas 
            id="disciplina-turmas-especiais"
            @alterar-turma="aoAlterarTurma"
            :eTurmaEspecial="true"
            :codigoDaDisciplina="codigoDaDisciplina"
            :nomeDaDisciplina="disciplina.nome"
            :possuiEquivalenciaDoisPorUm="possuiEquivalenciaDoisPorUm"
            :turmas="turmasEspeciais">
          </turmas>
        </template>
      </template>

      <v-card v-else>
        <v-card-text class="grey lighten-4">
          <span class="pl-4">
            Não há turmas disponíveis para esta disciplina.
          </span>
        </v-card-text>
      </v-card>
    </div>

    <div v-else>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
      <div class="pt-5 pb-5">
        <p class="text-lg-center subheading">
          Carregando turmas, aguarde ...
        </p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  SelecaoDeTurmaRequest,
} from '@/services/alteracao/request/SelecaoDeTurmaRequest';
import {
  AlternarTurmaAtualActionRequest,
} from '@/store/alteracao/request/AlternarTurmaAtualActionRequest';
import {
  SelecaoDeTurmaService,
} from '@/services/alteracao/SelecaoDeTurmaService';
import {
  RemocaoDeTurmaService,
} from '@/services/alteracao/RemocaoDeTurmaService';
import { Container } from 'typescript-ioc';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Disciplina } from '@/model/Disciplina';
import { Turma } from '@/model/Turma';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { TurmasActionRequest } from '@/store/alteracao/request/TurmasActionRequest';
import { MiniGradeActionTypes } from '@/store/miniGrade/actions';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
import ToolbarDeTurma from '@/components/alteracao/ToolbarDeTurma.vue';
import ToolbarDeTurmaEquivalente from '@/components/alteracao/ToolbarDeTurmaEquivalente.vue';
import ToolbarDeTurmaEspeciais from '@/components/alteracao/ToolbarDeTurmaEspeciais.vue';
import Turmas from '@/components/alteracao/Turmas.vue';
import NenhumaOpcao from '@/components/alteracao/NenhumaOpcao.vue';
import FeedbackDisciplina from '@/components/alteracao/FeedbackDisciplina.vue';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import SelecionarTelaAlteracaoTurmaEvent from '@/model/analytics/SelecionarTelaAlteracaoTurmaEvent.ts';
import { ToggleConstants } from '@/common/enum/ToggleConstants';

const store = namespace(StoreNamespaces.ALTERACAO);
const autorizacao = namespace(StoreNamespaces.AUTORIZACAO);
const miniGrade = namespace(StoreNamespaces.MINI_GRADE);

@Component({
  components: {
    NenhumaOpcao,
    Turmas,
    ToolbarDeTurma,
    ToolbarDeTurmaEquivalente,
    ToolbarDeTurmaEspeciais,
    FeedbackDisciplina,
  },
})
export default class SelecaoDeTurmas extends Vue {

  public get actionRequest(): TurmasActionRequest {
    return new TurmasActionRequest(this.codigoDaDisciplina, this.codigoDoAluno);
  }

  public get disciplina(): Disciplina {
    return this.disciplinaPor(this.codigoDaDisciplina);
  }

  public get turmas(): Turma[] {
    return this.turmasFiltradas(this.codigoDaDisciplina);
  }

  public get turmasEquivalentes(): Turma[] {
    return this.turmasEquivalentesFiltradas(this.codigoDaDisciplina);
  }

  public get turmasEspeciais(): Turma[] {
    return this.turmasEspeciaisFiltradas(this.codigoDaDisciplina);
  }

  public get possuiTurmas(): boolean {
    return (this.disciplina.turmas || []).length > 0;
  }

  public get possuiTurmasEquivalentes(): boolean {
    return (this.disciplina.turmasEquivalentes || []).length > 0;
  }

  public get possuiTurmasEspeciais(): boolean {
    return (this.disciplina.turmasEspeciais || []).length > 0;
  }

  public get possuiEquivalenciaDoisPorUm(): boolean {
    return this.disciplina.possuiEquivalenciaDoisPorUm;
  }

  private get selecaoDeTurmaService(): SelecaoDeTurmaService {
    return Container.get(SelecaoDeTurmaService);
  }

  private get remocaoDeTurmaService(): RemocaoDeTurmaService {
    return Container.get(RemocaoDeTurmaService);
  }

  private get codigoDoAluno(): number {
    return this.usuarioLogado.codigo || 0;
  }
  public prontoParaExibicao: boolean = false;

  @Prop()
  public codigoDaDisciplina!: number;

  @autorizacao.State
  public usuarioLogado!: UsuarioIdentity;

  @miniGrade.Action(MiniGradeActionTypes.CARREGAR_MINI_GRADE)
  public carregarMiniGrade!: (horarios: HorarioDaMiniGrade[]) => Promise<void>;

  @store.Action(AlteracaoActionTypes.TURMAS)
  public carregarTurmas!: (actionRequest: TurmasActionRequest) => Promise<void>;

  @store.Action(AlteracaoActionTypes.TURMAS_EQUIVALENTES)
  public carregarTurmasEquivalentes!: (actionRequest: TurmasActionRequest) => Promise<void>;

  @store.Action(AlteracaoActionTypes.TURMAS_ESPECIAIS)
  public carregarTurmasEspeciais!: (actionRequest: TurmasActionRequest) => Promise<void>;

  @store.Action(AlteracaoActionTypes.ALTERNAR_TURMA_ATUAL)
  public alternarTurmaAtual!: (actionRequest: AlternarTurmaAtualActionRequest) => Promise<void>;

  @store.Action(AlteracaoActionTypes.ALTERANDO_TURMAS)
  public alterandoTurmas!: () => Promise<void>;

  @store.Action(AlteracaoActionTypes.ALTERACAO_FINALIZADA)
  public alteracaoFinalizada!: () => Promise<void>;

  private toggleNovoSelecionadorHabilitado: boolean = true;

  @store.Action(AlteracaoActionTypes.INFORMAR_ALTERACAO)
  private informarAlteracao!: () => Promise<void>;

  @store.Getter(AlteracaoGetterTypes.DISCIPLINA)
  private disciplinaPor!: (codigoDaDisciplina: number) => Disciplina;

  @store.Getter(AlteracaoGetterTypes.TURMAS_FILTRADAS)
  private turmasFiltradas!: (codigoDaDisciplina: number) => Turma[];

  @store.Getter(AlteracaoGetterTypes.TURMAS_EQUIVALENTES_FILTRADAS)
  private turmasEquivalentesFiltradas!: (codigoDaDisciplina: number) => Turma[];

  @store.Getter(AlteracaoGetterTypes.TURMAS_ESPECIAIS_FILTRADAS)
  private turmasEspeciaisFiltradas!: (codigoDaDisciplina: number) => Turma[];

  public async mounted() {
    this.toggleNovoSelecionadorHabilitado = await this.toggleDoSelecionadorEstaHabilitado();
  }

  public async created() {
    await this.dispararCarregamentoDasTurmas()
      .then(this.mudarEstadoDeExibicao);
  }

  public async toggleDoSelecionadorEstaHabilitado(): Promise<boolean> {
    const toggleAtivado =
      await this.$features.habilitado(ToggleConstants.ExibirNovoSelecionadorDeTurmas);

    return toggleAtivado;
   }

  private async dispararCarregamentoDasTurmas(): Promise<any> {
    return Promise.all([
      this.carregarTurmas(this.actionRequest),
      this.carregarTurmasEquivalentes(this.actionRequest),
      this.carregarTurmasEspeciais(this.actionRequest),
    ]);
  }

  private mudarEstadoDeExibicao() {
    this.prontoParaExibicao = true;
  }

  private async aoAlterarTurma(request: SelecaoDeTurmaRequest, turma: Turma) {
    this.$analytics.track(new SelecionarTelaAlteracaoTurmaEvent(turma.descricao, turma.vagas));
    this.alterandoTurmas();

    try {
      const response = await this.selecaoDeTurmaService.processsar(request, this.codigoDoAluno);
      this.aoAlterarTurmaComSucesso(response.data.horarios, request.turma.codigoUnico);
    } catch (error) {
      this.aoAlterarTurmaFalhar(error);
    } finally {
      this.alteracaoFinalizada();
    }
  }

  private async aoRemoverTurma(codigoDaDisciplina: number) {
    this.alterandoTurmas();

    try {
      const response = await this.remocaoDeTurmaService.processar(codigoDaDisciplina,  this.codigoDoAluno);
      this.aoAlterarTurmaComSucesso(response.data.horarios);
    } catch (error) {
      this.aoRemoverTurmaFalhar();
    } finally {
      this.alteracaoFinalizada();
    }
  }

  private aoAlterarTurmaComSucesso(horarios: HorarioDaMiniGrade[], codigoUnico?: string): void {
    const request = new AlternarTurmaAtualActionRequest(this.codigoDaDisciplina, codigoUnico);
    this.informarAlteracao();
    this.alternarTurmaAtual(request);
    this.carregarMiniGrade(horarios);
  }

  private aoAlterarTurmaFalhar(erro: any) {
    const opcoes = new OpcoesDeDialogo(
      'Conflito de horário',
      erro.response.data.mensagemDeConflito,
      'OK',
      '',
    );

    this.$dialogo.abrir(opcoes);
  }

  private aoRemoverTurmaFalhar() {
    const opcoes = new OpcoesDeDialogo(
      'OPS!',
      'Ocorreu um problema na sua seleção.',
      'OK',
      '',
    );

    this.$dialogo.abrir(opcoes);
  }
}
</script>
