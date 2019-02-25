import { FactoryComponentBase } from '../../FactoryComponentBase';
import SelecaoDeTurmas from '@/components/alteracao/SelecaoDeTurmas.vue';
import { mount, Wrapper } from '@vue/test-utils';
import store, { StoreNamespaces } from '@/store';
import { FeatureFlag } from 'componente-frontend-core/model/FeatureFlag';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { FeatureTogglePlugin } from 'componente-frontend-core/plugins/FeatureToggle';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';
import { Turma } from '@/model/Turma';
import { TurmasEquivalentesMutationRequest } from '@/store/alteracao/request/TurmasEquivalentesMutationRequest';
import { TurmasMutationRequest } from '@/store/alteracao/request/TurmasMutationRequest';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoUmaSelecaoDeTurmaComSucesso,
} from '../../../doubles/stubs/alteracao/selecaoDeTurmas/DadoUmaSelecaoDeTurmaComSucesso';
import {
  DadoUmaSelecaoDeTurmaComErro,
} from '../../../doubles/stubs/alteracao/selecaoDeTurmas/DadoUmaSelecaoDeTurmaComErro';
import {
  DadoUmaRemocaoDeTurmaComSucesso,
} from '../../../doubles/stubs/alteracao/remocaoDeTurmas/DadoUmaRemocaoDeTurmaComSucesso';
import {
  DadoUmaRemocaoDeTurmaComErro,
} from '../../../doubles/stubs/alteracao/remocaoDeTurmas/DadoUmaRemocaoDeTurmaComErro';
import { DialogoPlugin } from '@/common/plugins/dialogo';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { DisciplinaMiniGrade } from '@/model/DisciplinaMiniGrade';
import { DisciplinasPorDiaDeSemanaDaMiniGrade } from '@/model/DisciplinasPorDiaDeSemanaDaMiniGrade';
import { MiniGradeState } from '@/store/miniGrade/state';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { AlunoMutationTypes } from '@/store/aluno/mutations';

export class SelecaoDeTurmasFactory extends FactoryComponentBase<SelecaoDeTurmas> {
  public codigoCalculoI: number = 1;
  public featureFlagStubs?: FeatureFlag[];

  public dadoQueApiRetorneStatusDeSucessoAoFazerPUT(): void {
    Container.bind(HttpService).to(DadoUmaSelecaoDeTurmaComSucesso);
  }

  public dadoQueApiRetorneErroAoFazerPUT(): any {
    Container.bind(HttpService).to(DadoUmaSelecaoDeTurmaComErro);
  }

  public dadoQueApiRetorneStatusDeSucessoAoFazerDelete(): void {
    Container.bind(HttpService).to(DadoUmaRemocaoDeTurmaComSucesso);
  }

  public dadoQueApiRetorneErroAoFazerDelete(): void {
    Container.bind(HttpService).to(DadoUmaRemocaoDeTurmaComErro);
  }

  public dadoQueAStoreDeAlteracaoPossuaCalculoI(): void {
    const namespace = StoreNamespaces.ALTERACAO;
    const setDisciplinas = AlteracaoMutationsTypes.SET_DISCIPLINAS;

    const calculoI = new Disciplina(
      this.codigoCalculoI, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false,
    );
    store.commit(`${ namespace }/${ setDisciplinas }`, [calculoI]);
  }

  public dadoQueExistaUmAlunoNaStore(): void {
    const informacoesDoAluno = new InformacoesAluno();
    informacoesDoAluno.codigoMarca = 1;

    store.commit(`${ StoreNamespaces.ALUNO }/${ AlunoMutationTypes.SET_INFORMACOES_ALUNO }`, informacoesDoAluno);
  }

  public dadoQueONovoSelecionadorEstaDesabilitado() {
    const selecionadorDeTurmas = new FeatureFlag();
    selecionadorDeTurmas.name = ToggleConstants.ExibirNovoSelecionadorDeTurmas;
    selecionadorDeTurmas.status = false;

    this.featureFlagStubs = [selecionadorDeTurmas];
  }

  public estaSelecionada(componente: Wrapper<any>): boolean {
    const valorDoInput = componente.element.getAttribute('value');
    return valorDoInput === 'true';
  }

  public estaCarregando(): boolean {
    const namespace = StoreNamespaces.ALTERACAO;
    const estaCarregando = AlteracaoGetterTypes.ESTA_CARREGANDO;

    return store.getters[`${ namespace }/${ estaCarregando }`];
  }

  public turmaRenderizada(): Wrapper<any> {
    return this.componente.find('#disciplina-turmas #turma-3');
  }

  public turmaEquivalenteRenderizada(): Wrapper<any> {
    return this.componente.find('#disciplina-turmas-equivalentes #turma-1');
  }

  public nenhumaOpcaoRenderizada(): Wrapper<any> {
    return this.componente.find('#nenhuma-opcao-1');
  }

  public get horarioDaMiniGradeEsperado(): HorarioDaMiniGrade {
    const calculoI =  new DisciplinaMiniGrade();
    calculoI.codigoDisciplina = 143924;
    calculoI.nomeDisciplina = 'Cálculo I';

    const disciplinasPorDiaDeSemana = new DisciplinasPorDiaDeSemanaDaMiniGrade();
    disciplinasPorDiaDeSemana[2] = [ calculoI ];
    disciplinasPorDiaDeSemana[5] = [ calculoI ];

    const horario =  new HorarioDaMiniGrade();
    horario.horaInicio = '20:55h';
    horario.disciplinasPorDiaDeSemana = disciplinasPorDiaDeSemana;

    return horario;
  }

  public get turma(): Turma {
    const turma = new Turma();
    turma.codigo = 3;
    turma.horariosParaExibicao = ['Quarta'];
    turma.horariosDeTurmaSemanal = [];
    turma.horariosDeTurmaPorData = [];
    turma.campus = 'Buritis';
    turma.curso = 'CC';
    turma.descricao = 'X48';
    turma.vagas = 10;
    turma.eTurmaAtual = false;
    turma.codigoPeriodicidade = 1;
    turma.complementares = [];
    return turma;
  }

  public get turmaEquivalente(): Turma {
    const turma = new Turma();
    turma.codigo = 1;
    turma.horariosParaExibicao = ['Terça'];
    turma.horariosDeTurmaSemanal = [];
    turma.horariosDeTurmaPorData = [];
    turma.campus = 'Aimorés';
    turma.curso = 'CC';
    turma.descricao = 'X40';
    turma.vagas = 3;
    turma.eTurmaAtual = false;
    turma.codigoPeriodicidade = 1;
    turma.complementares = [];
    return turma;
  }


  public get turmaEspecial(): Turma {
    const turma = new Turma();
    turma.codigo = 8;
    turma.horariosParaExibicao = ['Sexta'];
    turma.horariosDeTurmaSemanal = [];
    turma.horariosDeTurmaPorData = [];
    turma.campus = 'Buritis';
    turma.curso = 'AI';
    turma.descricao = 'X1';
    turma.vagas = 2;
    turma.eTurmaAtual = false;
    turma.codigoPeriodicidade = 1;
    turma.complementares = [];
    turma.minimoParaConfirmacao = 3;
    turma.numeroDeReserva = 10;
    return turma;
  }


  public get stateDaMiniGrade(): MiniGradeState {
    return (store.state as any).miniGrade;
  }

  public criarWrapper(): void {
    localVue.use(FeatureTogglePlugin, store, this.featureFlagStubs);
    localVue.use(DialogoPlugin);
    this.componente = mount(SelecaoDeTurmas, {
      localVue,
      propsData: {
        codigoDaDisciplina: this.codigoCalculoI,
      },
      store,
      methods: {
        carregarTurmas: () => {
          store.commit(
            `${ StoreNamespaces.ALTERACAO }/${ AlteracaoMutationsTypes.SET_TURMAS }`,
            new TurmasMutationRequest(this.codigoCalculoI, [ this.turma ]),
          );
        },
        carregarTurmasEquivalentes: () => {
          store.commit(
            `${ StoreNamespaces.ALTERACAO }/${ AlteracaoMutationsTypes.SET_TURMAS_EQUIVALENTES }`,
            new TurmasEquivalentesMutationRequest(this.codigoCalculoI, [ this.turmaEquivalente ]),
          );
        },
        carregarTurmasEspeciais: jest.fn(),
      },
    });
  }

}
