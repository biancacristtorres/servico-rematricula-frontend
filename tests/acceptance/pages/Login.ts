import { BasePage } from 'componente-frontend-core/tests/Page';

export default class Login extends BasePage {

  get url() {
    return '/Login';
  }

  get urlAtual() {
    return page.url();
  }

  public async botaoEntrar() {
    return await this.getElement('#login-botao');
  }

  public async alertaDeLoginInvalidoEstaVisivel() {
    const alerta = await this.getElement('.v-alert');
    const propriedadeStyle = await alerta.getProperty('style');
    const propriedadeDisplay = await propriedadeStyle.getProperty('display');
    const estaVisivel = await propriedadeDisplay.jsonValue();

    return estaVisivel === '' ? true : false;
  }

  public async preencherLoginESenha(valor: string) {
    const campoLogin = await this.inputLogin();
    await campoLogin.type(valor);
    await page.waitFor(100);

    const campoSenha = await this.inputSenha();
    await campoSenha.type(valor);
    await page.waitFor(100);
  }

  private async inputLogin() {
    return await this.getElement('#login-usuario');
  }

  private async inputSenha() {
    return await this.getElement('#login-senha');
  }
}
