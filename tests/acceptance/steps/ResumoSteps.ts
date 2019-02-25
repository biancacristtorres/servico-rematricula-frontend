import { binding, given, when, then } from 'cucumber-tsflow';
import { expect } from 'chai';
import AlunoWorkspace from '../workspaces/AlunoWorkspace';
import Resumo from '../pages/Resumo';

@binding([AlunoWorkspace])
export default class TelaLoginSteps {
  private paginaResumo!: Resumo;

  constructor(protected alunoWorkspace: AlunoWorkspace) {
    this.paginaResumo = new Resumo();
  }

  @given(/^que minhas alterações foram processadas$/)
  public async dadoQueMinhasAlteracoesForamProcessadas() {
    // sem implementação
  }

  @given(/^que minhas alterações estão sendo processadas$/)
  public async dadoQueMinhasAlteracoesEstaoSendoProcessadas() {
    // sem implementação
  }

  @when(/^aciono o botão Alterar Disciplinas e Horários$/)
  public async quandoAcionoOBotaoAlterarDisciplinasEHorarios() {
    const botaoAlterar = await this.paginaResumo.botaoAlterar();

    await this.paginaResumo.elementClick(botaoAlterar);
  }

  @when(/^aciono a opção 'Ver datas' da disciplina 'Língua Brasileira de Sinais - LIBRAS'$/)
  public async quandoAcionoAOpcaoVerDatasDaDisciplina() {
    const verDatas = await this.paginaResumo.verDatas();

    await this.paginaResumo.elementClick(verDatas, 250);
  }

  @given(/^que acessei a Avaliação de Rematrícula$/)
  @when(/^aciono o botão Avalie Sua Rematrícula$/)
  public async quandoAcionoOBotaoAvalieSuaRematricula() {
    const avalieSuaRematricula = await this.paginaResumo.avalieSuaRematricula();

    await this.paginaResumo.elementClick(avalieSuaRematricula);
  }

  @when(/^preencho as informações de avaliação$/)
  public async quandoPreenchoAsInformacoesDeAvaliacao() {
    const numerosNPS = await this.paginaResumo.numerosNPS();
    await this.paginaResumo.elementClick(numerosNPS[9]);

    const textoNPS = await this.paginaResumo.textoNPS();
    await textoNPS.type('teste');
  }

  @when(/^aciono o botão Enviar$/)
  public async quandoAcionoOBotaoEnviar() {
    const botaoEnviarNPS = await this.paginaResumo.botaoEnviarNPS();

    await this.paginaResumo.elementClick(botaoEnviarNPS);
  }

  @then(/^visualizo uma modal com as datas da aula da disciplina$/)
  public async entaoVisualizoUmaModalComAsDatasDaAulaDaDisciplina() {
    const modal = await this.paginaResumo.modalDeDatas();

    expect(modal).to.not.be.null;
  }

  @then(/^visualizo o botão Alterar Disciplinas habilitado$/)
  public async entaoVisualizoOBotaoAlterarDisciplinasHabilitado() {
    const estaDesabilitado = await this.paginaResumo.alterarEstaDesabilitado();

    expect(estaDesabilitado).to.be.false;
  }

  @then(/^visualizo o botão Alterar Disciplinas desabilitado$/)
  public async entaoVisualizoOBotaoAlterarDisciplinasDesabilitado() {
    const estaDesabilitado = await this.paginaResumo.alterarEstaDesabilitado();

    expect(estaDesabilitado).to.be.true;
  }

  @then(/^visualizo uma modal com a avaliação da rematrícula$/)
  public async entaoVisualizoUmaModalComAAvalicacaoDaRematricula() {
    const modalDeNPS = await this.paginaResumo.modalDeNPS();

    expect(modalDeNPS).to.not.be.null;
  }

  @then(/^visualizo a mensagem de sucesso de envio da avaliação$/)
  public async entaoVisualizoAMensagemDeSucessoDeEnvioDaAvaliacao() {
    const sucessoEnvioNPS = await this.paginaResumo.sucessoEnvioNPS();

    expect(sucessoEnvioNPS).to.not.be.null;
  }
}
