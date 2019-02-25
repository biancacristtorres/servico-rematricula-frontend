import { BasePage } from 'componente-frontend-core/tests/Page';

export default class Alteracao extends BasePage {

  get url() {
    return '/Alteracao';
  }

  get urlAtual() {
    return page.url();
  }

  public async liEAceito() {
    const liEAceito = await this.getElement('#botaoLiEAceito');

    return liEAceito;
  }
}
