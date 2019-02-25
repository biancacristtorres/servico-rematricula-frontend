import { __await } from 'tslib';
import { binding, given, when, then } from 'cucumber-tsflow';
import { expect } from 'chai';
import AlunoWorkspace from '../workspaces/AlunoWorkspace';
import Login from '../pages/Login';

@binding([AlunoWorkspace])
export default class GlobalSteps {
  private paginaLogin!: Login;

  constructor(protected alunoWorkspace: AlunoWorkspace) {
    this.paginaLogin = new Login();
  }

  @given(/^que sou '([^"]*)'$/)
  public async dadoAPersona(persona: string) {
    this.alunoWorkspace.setarPersona(persona);
  }

  @given(/^que estou na tela de Login$/)
  public async dadoQueEstouNaTelaDeLogin() {
    await page.goto(`${process.env.APP_URL}/Login`, {waitUntil: 'load'});
  }

  @given(/^que estou na tela de Início$/)
  public async dadoQueEstouNaTelaDeInicio() {
    await this.RealizarLogin();

    await page.goto(`${process.env.APP_URL}/Inicio`, {waitUntil: 'load'});
  }

  @given(/^que estou na tela de Interesse$/)
  public async dadoQueEstouNaTelaDeInteresse() {
    await this.RealizarLogin();

    await page.goto(`${process.env.APP_URL}/Interesse`, {waitUntil: 'load'});
  }

  @given(/^que estou na tela de Resumo$/)
  public async dadoQueEstouNaTelaDeResumo() {
    await this.AcessarResumo();
  }

  @given(/^que estou na tela de Alteração$/)
  public async dadoQueEstouNaTelaDeAlteracao() {
    await this.AcessarAlteracao();
  }

  @given(/^que estou na tela de Contrato$/)
  public async dadoQueEstouNaTelaDeContrato() {
    await this.RealizarLogin();
  }

  @when(/^acesso a tela de Interesse$/)
  public async quandoAcessoATelaDeInteresse() {
    await this.RealizarLogin();

    await page.goto(`${process.env.APP_URL}/Interesse`, {waitUntil: 'load'});
  }

  @when(/^acesso a tela de Alteração$/)
  public async quandoAcessoATelaDeAlteracao() {
    await this.AcessarAlteracao();
  }

  @when(/^acesso a tela de Resumo$/)
  public async quandoAcessoATelaDeResumo() {
    await this.AcessarResumo();
  }

  @then(/^sou redirecionado para a tela de Início$/)
  public async entaoSouRedirecionadoParaATelaDeInicio() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/Inicio`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  @then(/^sou redirecionado para a tela de Interesse$/)
  public async entaoSouRedirecionadoParaTelaDeInteresse() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/Interesse`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  @then(/^sou redirecionado para a tela de Contrato$/)
  public async entaoSouRedirecionadoParaATelaDeContrato() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/Contrato`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  @then(/^sou redirecionado para a tela de Pendência Financeira$/)
  public async entaoSouRedirecionadoParaATelaDePendenciaFinanceira() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/erro/PendenciaFinanceira`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  @then(/^sou redirecionado para a tela de Pendência Acadêmica$/)
  public async entaoSouRedirecionadoParaATelaDePendenciaAcademica() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/erro/PendenciaAcademica`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  @then(/^sou redirecionado para a tela de SoftLaunch$/)
  public async entaoSouRedirecionadoParaATelaDeSoftLaunch() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/erro/RematriculaNaoIniciada`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  @then(/^sou redirecionado para a tela de Aguardando Rematrícula$/)
  public async entaoSouRedirecionadoParaTelaDeAguardandoRematricula() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/AguardandoRematricula`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  @then(/^sou redirecionado para a tela de Resumo$/)
  public async entaoSouRedirecionadoParaATelaDeResumo() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/Resumo`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  @then(/^sou redirecionado para tela de Alteração$/)
  public async entaoSouRedirecionadoParaATelaDeAlteracao() {
    const valorAtual = page.url();
    const valorEsperado = `${urlBase}/Alteracao`;

    expect(valorAtual).to.be.equal(valorEsperado);
  }

  public async RealizarLogin() {
    await page.goto(`${process.env.APP_URL}/Login`, {waitUntil: 'load'});

    const valor = this.alunoWorkspace.persona.codigoAluno;
    await this.paginaLogin.preencherLoginESenha(valor);

    const botaoEntrar = await this.paginaLogin.botaoEntrar();

    await this.paginaLogin.elementClick(botaoEntrar, 1000);
  }

  public async AcessarAlteracao() {
    await this.RealizarLogin();

    await page.goto(`${process.env.APP_URL}/Alteracao`);
    await page.waitFor(1000);
  }

  public async AcessarResumo() {
    await this.RealizarLogin();

    await page.goto(`${process.env.APP_URL}/Resumo`);
    await page.waitFor(1000);
  }
}
