import { __await } from 'tslib';
import { binding, given, when, then } from 'cucumber-tsflow';
import { expect } from 'chai';
import Alteracao from '../pages/Alteracao';
import AlunoWorkspace from '../workspaces/AlunoWorkspace';

@binding([AlunoWorkspace])
export default class TelaAlteracaoSteps {
  private paginaAlteracao!: Alteracao;
  private nomeDisciplina!: string;
  private turmaDisciplina!: string;

  constructor(protected alunoWorkspace: AlunoWorkspace) {
    this.paginaAlteracao = new Alteracao();
    this.nomeDisciplina = '';
    this.turmaDisciplina = '';
  }

  @given(/^que acionei a expansão da disciplina '([^"]*)'$/)
  public async dadoQueAcioneiAExpansaoDaDisciplina(nomeDisciplina: string) {
    this.nomeDisciplina = nomeDisciplina;
    await this.paginaAlteracao.expandirDisciplina(nomeDisciplina);
  }

  @when(/^aciono a expansão da disciplina '([^"]*)'$/)
  public async quandoAcionoAExpansaoDaDisciplina(nomeDisciplina: string) {
    this.nomeDisciplina = nomeDisciplina;
    const expansaoDaDisciplina = await this.paginaAlteracao.expandirDisciplina(nomeDisciplina);

    expect(expansaoDaDisciplina).to.not.be.null;
  }

  @when(/^seleciono a turma EME4BN-COA$/)
  public async quandoSelecionoATurmaEME4BNCOA() {
    this.turmaDisciplina = 'EME4BN-COA';
    const turmaEME4BNCOA = await this.paginaAlteracao.turmaEME4BNCOA(this.nomeDisciplina);

    await this.paginaAlteracao.elementClick(turmaEME4BNCOA);
  }

  @when(/^seleciono a turma EPR4BN-COA1$/)
  public async quandoSelecionoATurmaEPR4BNCOA1() {
    this.turmaDisciplina = 'EPR4BN-COA1';
    const turmaEPR4BNCOA1 = await this.paginaAlteracao.turmaEPR4BNCOA1(this.nomeDisciplina);

    await this.paginaAlteracao.elementClick(turmaEPR4BNCOA1);
  }

  @when(/^seleciono a turma ECV1BN-COA1$/)
  public async quandoSelecionoATurmaECV1BNCOA1() {
    this.turmaDisciplina = 'ECV1BN-COA1';
    const turmaECV1BNCOA1 = await this.paginaAlteracao.turmaECV1BNCOA1(this.nomeDisciplina);

    await this.paginaAlteracao.elementClick(turmaECV1BNCOA1);
  }

  @when(/^seleciono a turma EME4BN-COA1$/)
  public async quandoSelecionoATurmaEME4BNCOA1() {
    this.turmaDisciplina = 'EME4BN-COA1';
    const turmaEME4BNCOA1 = await this.paginaAlteracao.turmaEME4BNCOA1(this.nomeDisciplina);

    await this.paginaAlteracao.elementClick(turmaEME4BNCOA1);
  }

  @when(/^seleciono a turma ECR4BN-COA$/)
  public async quandoSelecionoATurmaECR4BNCOA() {
    this.turmaDisciplina = 'ECR4BN-COA';
    const turmaECR4BNCOA = await this.paginaAlteracao.turmaECR4BNCOA(this.nomeDisciplina);

    await this.paginaAlteracao.elementClick(turmaECR4BNCOA);
  }

  @when(/^seleciono a opção Nenhuma das opções$/)
  public async quandoSelecionoAOpcaoNenhumaDasOpcoes() {
    const nenhumaDasOpcoes = await this.paginaAlteracao.nehumaDasOpcoes(this.nomeDisciplina);

    await this.paginaAlteracao.elementClick(nenhumaDasOpcoes);
  }

  @when(/^aciono o botão Salvar Alterações$/)
  public async quandoAcionoOBotaoSalvarAlteracoes() {
    const botaoSalvarAlteracoes = await this.paginaAlteracao.botaoSalvarAlteracoes();

    await this.paginaAlteracao.elementClick(botaoSalvarAlteracoes);
  }

  @when(/^aciono a opção 'Ver datas' da turma EME4BN-COA1$/)
  public async quandoAcionoAOpcaoVerDatasDaTurmaEME4BNCOA1() {
    const verDatas = await this.paginaAlteracao.verDatas(this.nomeDisciplina);

    await this.paginaAlteracao.elementClick(verDatas);
  }

  @when(/^retiro a disciplina '([^"]*)' da minha matrícula$/)
  public async quandoRetiroADisciplinaDaMinhaMatricula(nomeDisciplina: string) {
    this.nomeDisciplina = nomeDisciplina;
    await this.paginaAlteracao.expandirDisciplina(nomeDisciplina);

    const nenhumaDasOpcoes = await this.paginaAlteracao.nehumaDasOpcoes(this.nomeDisciplina);

    await this.paginaAlteracao.elementClick(nenhumaDasOpcoes);
  }

  @then(/^visualizo as turmas da disciplina$/)
  public async entaoVisualizoAsTurmasDaDisciplina() {
    const listaDeTurmasNormais = await this.paginaAlteracao.listaDeTurmasNormais(this.nomeDisciplina);

    expect(listaDeTurmasNormais).to.length(4);
  }

  @then(/^visualizo minhas disciplinas disponíveis$/)
  public async entaoVisualizoMinhasDisciplinasDisponiveis() {
    const disciplinasDisponiveis = await this.paginaAlteracao.disciplinasDisponiveis();

    expect(disciplinasDisponiveis).to.length(10);
  }

  @then(/^visualizo minhas disciplinas confirmadas$/)
  public async entaoVisualizoMinhasDisciplinasConfirmadas() {
    const disciplinasConfirmadas = await this.paginaAlteracao.disciplinasConfirmadas();

    expect(disciplinasConfirmadas).to.length(5);
  }

  @then(/^visualizo as turmas equivalentes da disciplina$/)
  public async entaoVisualizoAsTurmasEquivalentesDaDisciplina() {
    const listaDeTurmasEquivalentes = await this.paginaAlteracao.listaDeTurmasEquivalentes(this.nomeDisciplina);

    expect(listaDeTurmasEquivalentes).to.length(2);
  }

  @then(/^visualizo as turmas compostas da disciplina$/)
  public async entaoVisualizoAsTurmasCompostasDaDisciplina() {
    const listaDeTurmasCompostas = await this.paginaAlteracao.listaDeTurmasCompostas(this.nomeDisciplina);

    expect(listaDeTurmasCompostas).to.length(1);
  }

  @then(/^visualizo a marcação na turma selecionada$/)
  public async entaoVisualizoAMarcacaoNaTurmaSelecionada() {
    const turmaNormalSelecionada =
      await this.paginaAlteracao.turmaNormalSelecionada(this.turmaDisciplina, this.nomeDisciplina);

    expect(turmaNormalSelecionada).to.be.true;
  }

  @then(/^visualizo a marcação da turma equivalente selecionada/)
  public async entaoVisualizoAMarcacaoDaTurmaEquivalenteSelecionada() {
    const turmaEquivalenteSelecionada =
      await this.paginaAlteracao.turmaEquivalenteSelecionada(this.turmaDisciplina, this.nomeDisciplina);

    expect(turmaEquivalenteSelecionada).to.be.true;
  }

  @then(/^visualizo a marcação de Nenhuma das opções$/)
  public async entaoVisualizoAMarcacaoDeNenhumaDasOpcoes() {
    const nenhumaDasOpcoesMarcada = await this.paginaAlteracao.nenhumaDasOpcoesMarcada(this.nomeDisciplina);

    expect(nenhumaDasOpcoesMarcada).to.be.true;
  }

  @then(/^visualizo um alerta de choque de horário$/)
  public async entaoOSistemaApresentaUmAlertaDeChoqueDeHorario() {
    const alerta = await this.paginaAlteracao.alertaDeErro();

    expect(alerta).to.not.be.null;
  }

  @then(/^visualizo a marcação retornando para a turma confirmada da disciplina$/)
  public async entaoVisualizoAMarcacaoRetornandoParaATurmaConfirmadaDaDisciplina() {
    const turmaConfirmada = await this.paginaAlteracao.turmaConfirmada(this.nomeDisciplina);

    expect(turmaConfirmada).to.be.true;
  }

  @then(/^visualizo a marcação retornando para Nenhuma das opções da disciplina$/)
  public async entaoVisualizoAMarcacaoRetornandoParaNenhumaDasOpcoesDaDisciplina() {
    const nenhumaDasOpcoesMarcada = await this.paginaAlteracao.nenhumaDasOpcoesMarcada(this.nomeDisciplina);

    expect(nenhumaDasOpcoesMarcada).to.be.true;
  }

  @then(/^visualizo uma mensagem de erro$/)
  public async entaoVisualizoUmaMensagemDeErro() {
    const alerta = await this.paginaAlteracao.alertaDeErro();

    expect(alerta).to.not.be.null;
  }

  @then(/^confirmo a mensagem de alterações solicitadas$/)
  public async entaoConfirmoAMensagemDeAlteracoesSolicitadas() {
    const confirmarMensagem = await this.paginaAlteracao.confirmarMensagem();

    await this.paginaAlteracao.elementClick(confirmarMensagem);
  }

  @then(/^visualizo a informação de que não existem turmas disponíveis$/)
  public async entaoVisualizoAInformacaoDeQueNaoExistemTurmasDisponiveis() {
    const informacaoSemTurmas = await this.paginaAlteracao.informacaoSemTurmas(this.nomeDisciplina);

    expect(informacaoSemTurmas).to.not.be.null;
  }

  @then(/^visualizo uma modal com as datas da aula da disciplina$/)
  public async entaoVisualizoUmaModalComAsDatasDaAulaDaDisciplina() {
    const modalDeDatas = await this.paginaAlteracao.modalDeDatas();

    expect(modalDeDatas).to.be.not.null;
  }

  @then(/^visualizo uma disciplina eletiva na lista de disciplinas equivalentes$/)
  public async entaoVisualizoUmaDisciplinaEletivaNaListaDeDisciplinasEquivalentes() {
    const listaDeTurmasEletivas = await this.paginaAlteracao.listaDeTurmasEquivalentes(this.nomeDisciplina);

    expect(listaDeTurmasEletivas).to.length(1);
  }

  @then(/^visualizo uma mensagem de quebra de módulo$/)
  public async entaoVisualizoUmaMensagemDeQuebraDeModulo() {
    const alerta = await this.paginaAlteracao.alertaDeErro();

    expect(alerta).to.be.not.null;
  }

  @then(/^visualizo uma mensagem de mínimo de disciplinas$/)
  public async entaoVisualizoUmaMensagemDeMinimoDeDisciplinas() {
    const alerta = await this.paginaAlteracao.alertaDeErro();

    expect(alerta).to.be.not.null;
  }

  @then(/^visualizo o horário da turma que estava marcada sendo removido da mini grade$/)
  public async entaoVisualizoOHorarioDaTurmaQueEstavaMarcadaSendoRemovidoDaMiniGrade() {
    const horarioSemMarcacaoDeGeologia = await this.paginaAlteracao.horarioSemMarcacaoDeGeologia();

    expect(horarioSemMarcacaoDeGeologia).to.be.true;
  }

  @then(/^visualizo o horário da turma que acabei de marcar aparecendo na mini grade$/)
  public async entaoVisualizoOHorarioDaTurmaQueAcabeiDeMarcarAparecendoNaMiniGrade() {
    const horarioMarcadoDeFisica = await this.paginaAlteracao.horarioMarcadoDeFisica();

    expect(horarioMarcadoDeFisica).to.be.true;
  }
}
