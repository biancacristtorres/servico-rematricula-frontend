import { FactoryComponentBase } from '../../FactoryComponentBase';
import Turmas from '@/components/alteracao/Turmas.vue';
import { mount, WrapperArray } from '@vue/test-utils';
import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';
import { SelecaoDeTurmaRequest } from '@/services/alteracao/request/SelecaoDeTurmaRequest';
import { TurmaRequest } from '@/services/alteracao/request/TurmaRequest';
import store, { StoreNamespaces } from '@/store';
import { FeatureFlag } from 'componente-frontend-core/model/FeatureFlag';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { FeatureTogglePlugin } from 'componente-frontend-core/plugins/FeatureToggle';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';
import { DialogoPlugin } from '@/common/plugins/dialogo';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { AlunoMutationTypes } from '@/store/aluno/mutations';
import { TipoCargaHoraria } from '@/common/enum/TipoCargaHoraria';

export class TurmasFactory extends FactoryComponentBase<Turmas> {
  public codigoDaDisciplina: number = 151478;
  public solicitarAviso: jest.Mock<any> = jest.fn();
  public featureFlagStubs?: FeatureFlag[];

  private exibirCabecalho!: boolean;
  private turmas!: Turma[];
  private disciplinaSemTurmas!: string;

  public get turmaSelecionada() {
    const turma = new Turma();
    turma.codigo = 1;
    turma.eTurmaAtual = true;
    turma.complementares = [];

    return turma;
  }

  public get turmaNaoSelecionada() {
    const turma = new Turma();
    turma.codigo = 2;
    turma.eTurmaAtual = false;
    turma.horariosDeTurmaSemanal = [];
    turma.horariosDeTurmaPorData = [];
    turma.complementares = [];

    return turma;
  }

  public get turmaComplementar() {
    const turmaComplementar = new TurmaComplementar();
    turmaComplementar.codigo = 1;

    return turmaComplementar;
  }

  public get turmaSelecionadaComComplementar() {
    const turma = this.turmaSelecionada;
    turma.complementares = [this.turmaComplementar];

    return turma;
  }

  public get turmaNaoSelecionadaComComplementar() {
    const turma = this.turmaNaoSelecionada;
    turma.complementares = [this.turmaComplementar];

    return turma;
  }

  public get turmaSemanal() {
    const turmaSemanal = new Turma();
    turmaSemanal.codigo = 3;
    turmaSemanal.horariosParaExibicao = [ 'Segunda, 20 horas' ];
    turmaSemanal.eTurmaPorData = false;

    return turmaSemanal;
  }

  public get turmaPorData() {
    const turmaSemanal = new Turma();
    turmaSemanal.codigo = 3;
    turmaSemanal.eTurmaPorData = true;

    return turmaSemanal;
  }

  public get turmaComVagasNegativas() {
    const turma = new Turma();
    turma.codigo = 5;
    turma.vagas = -3;

    return turma;
  }

  public get turmaPraticaComVagas(): Turma {
    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turma.codigo = 6;
    turma.vagas = 10;
    return turma;
  }

  public get turmaPraticaSemVagas(): Turma {
    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turma.codigo = 7;
    turma.vagas = 0;
    turma.horariosDeTurmaSemanal = [];
    turma.horariosDeTurmaPorData = [];
    turma.complementares = [];
    return turma;
  }

  public get requestEsperadoDaTurmaNaoSelecionada(): SelecaoDeTurmaRequest {
    const turmaRequest = new TurmaRequest();
    turmaRequest.codigo = 2;
    turmaRequest.horariosDeTurmaSemanal = [];
    turmaRequest.horariosDeTurmaPorData = [];
    turmaRequest.complementares = [];

    const request = new SelecaoDeTurmaRequest();
    request.codigoDaDisciplina = this.codigoDaDisciplina;
    request.turma = turmaRequest;

    return request;
  }

  public dadoExibirCabecalho(valor: boolean): void {
    this.exibirCabecalho = valor;
  }

  public dadoQueExistemDuasTurmas(): void {
    this.turmas = [
      this.turmaSelecionada,
      this.turmaNaoSelecionada,
    ];
  }

  public dadoQueExistemDuasTurmasComplementares(): void {
    this.turmas = [
      this.turmaSelecionadaComComplementar,
      this.turmaNaoSelecionadaComComplementar,
    ];
  }

  public dadoQueExisteUmaTurmaSemanal(): void {
    this.turmas = [ this.turmaSemanal ];
  }

  public dadoQueExisteUmaTurmaPorData(): void {
    this.turmas = [ this.turmaPorData ];
  }

  public dadoQueNaoExistemTurmas(): void {
    this.turmas = [];
  }

  public dadoQueExisteUmaTurmaPraticaComVagas(): void {
    this.turmas = [ this.turmaPraticaComVagas ];
  }

  public  dadoQueExisteUmaTurmaPraticaSemVagas(): void {
    this.turmas = [ this.turmaPraticaSemVagas ];
  }

  public dadoAMensagemDeDisciplinaSemTurmas(mensagem: string): any {
    this.disciplinaSemTurmas = mensagem;
  }

  public dadoQueExisteUmaSelecaoEmProcessamento(): void {
    const namespace = StoreNamespaces.ALTERACAO;
    const setAlterando = AlteracaoMutationsTypes.SET_ALTERANDO;

    store.commit(`${ namespace }/${ setAlterando }`, true);
  }

  public dadoQueNaoExisteUmaSelecaoEmProcessamento(): void {
    const namespace = StoreNamespaces.ALTERACAO;
    const setAlterando = AlteracaoMutationsTypes.SET_ALTERANDO;

    store.commit(`${ namespace }/${ setAlterando }`, false);
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

  public selecionar(turma: Turma): void {
    this.componente.find(`#turma-${ turma.codigo }`).trigger('click');
  }

  public estaSelecionada(turma: Turma): boolean {
    const valorDoInput = this.componente
      .find(`#turma-${ turma.codigo }`)
      .element
      .getAttribute('value');

    return valorDoInput === 'true';
  }

  public get loadings(): WrapperArray<any> {
    return this.componente.findAll('.aguardando-alteracao');
  }

  public get radios(): WrapperArray<any> {
    return this.componente.findAll('.selecionar-turma');
  }

  public criarWrapper(): void {
    localVue.use(FeatureTogglePlugin, store, this.featureFlagStubs);
    localVue.use(DialogoPlugin);
    this.componente = mount(Turmas, {
      localVue,
      store,
      propsData: {
        codigoDaDisciplina: this.codigoDaDisciplina,
        exibirCabecalho: this.exibirCabecalho,
        turmas: this.turmas,
        disciplinaSemTurmas: this.disciplinaSemTurmas,
      },
      methods: {
        solicitarAviso: (request: SelecaoDeTurmaRequest, codigoDoAluno: number) => {
          this.solicitarAviso();
        },
      },
    });
  }

}
