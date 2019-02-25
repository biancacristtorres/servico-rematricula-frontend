import { binding, when, then, given } from 'cucumber-tsflow';
import { expect } from 'chai';
import AlunoWorkspace from '../workspaces/AlunoWorkspace';
import Login from '../pages/Login';

@binding([AlunoWorkspace])
export default class TelaLoginSteps {
  private paginaLogin!: Login;
  private linkImpersonate!: string;

  constructor(protected alunoWorkspace: AlunoWorkspace) {
    this.paginaLogin = new Login();
  }

  @given(/^que preenchi as informações de login e senha$/)
  public async dadoQuePreenchiAsInformacoesDeLoginESenha() {
    const valor = this.alunoWorkspace.persona.codigoAluno;
    await this.paginaLogin.preencherLoginESenha(valor);
  }

  @given(/^que não preenchi corretamente as informações de login e senha$/)
  public async dadoQueNaoPreenchiCorretamenteAsInformacoesDeLoginESenha() {
    const valor = 'sempermissao';
    await this.paginaLogin.preencherLoginESenha(valor);
  }

  @given(/^que tenho um link completo para o impersonate$/)
  public async dadoQueTenhoUmLinkCompletoParaOImpersonate() {
    this.linkImpersonate = `${process.env.APP_URL}/autorizacao/token/eyJ0eXAiOiJKV1QiLCJhb
    GciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LmFuaW1hZWR1Y2FjYW8uY29tLmJyIiwiYXVkI
    joiaHR0cHM6Ly9pZGVudGl0eS5hbmltYWVkdWNhY2FvLmNvbS5ici9yZXNvdXJjZXMiLCJleHAiOjE1NDkzNz
    Y0MTAsIm5iZiI6MTU0OTIxNjAyMSwiY2xpZW50X2lkIjoidWxpZmUiLCJzY29wZSI6WyJhbGxfY2xhaW1zIiw
    iZW1haWwiLCJvcGVuaWQiLCJ1bGlmZSJdLCJzdWIiOiJ0aGlhZ29zZyIsImF1dGhfdGltZSI6MTU0OTIxNjAx
    OSwiaWRwIjoiaWRzcnYiLCJuYW1lIjoidGhpYWdvc2ciLCJnaXZlbl9uYW1lIjoiVGhpYWdvIiwicHJlZmVyc
    mVkX3VzZXJuYW1lIjoidGhpYWdvc2ciLCJmYW1pbHlfbmFtZSI6ImRhIFNpbHZhIEdvbmNhbHZlcyIsImNvZG
    lnb0FsdW5vIjoxMzEwMjQ1LCJhZFBhdGgiOiJDTj1UaGlhZ28gZGEgU2lsdmEgR29uY2FsdmVzLE9VPUZVTkN
    JT05BUklPUyxPVT1BTklNQSxPVT1BTklNQSxEQz1hbmltYSxEQz1pbnRyYW5ldCIsImVtYWlsIjoidGhpYWdv
    c2dAYW5pbWFlZHVjYWNhby5jb20uYnIiLCJpc0NvbGFib3JhZG9yIjoidHJ1ZSIsImNwZiI6IjA4ODQ3NjIwN
    jg2IiwibnVtZXJvTWF0cmljdWxhIjoiOTAwMDAwNTQzIiwiaXNVc3VhcmlvIjoidHJ1ZSIsImFtciI6WyJwYX
    Nzd29yZCJdLCJqdGkiOiIzMmFkMzllZC0zNzQxLTRiNGQtYTUxZi05YmY4MzYwOTNhMGIiLCJpYXQiOjE1NDk
    zNzI4MTB9.Afd4eX-qfwAehfSM9b2uy2DZrHdWckPX2vkOMRml28Q/1310245`;
  }

  @given(/^que o aluno já aceitou o contrato$/)
  public async dadoQueOAlunoJaAceitouOContrato() {
    // sem implementação
  }

  @when(/^realizo o login$/)
  public async quandoRealizoOLogin() {
    const botaoEntrar = await this.paginaLogin.botaoEntrar();

    await this.paginaLogin.elementClick(botaoEntrar, 1000);
  }

  @when(/^acesso o sistema utilizando o link$/)
  public async quandoAcessoOSistemaUtilizandoOLink() {
    await page.goto(this.linkImpersonate, {waitUntil: 'load'});
  }

  @then(/^visualizo uma mensagem de erro de permissão$/)
  public async entaoVisualizoUmaMensagemDeErroDePermissao() {
    const alertaDeLoginInvalidoEstaVisivel = await this.paginaLogin.alertaDeLoginInvalidoEstaVisivel();

    expect(alertaDeLoginInvalidoEstaVisivel).to.be.true;
  }
}
