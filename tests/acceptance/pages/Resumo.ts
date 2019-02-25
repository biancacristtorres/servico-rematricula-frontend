import { BasePage } from 'componente-frontend-core/tests/Page';

export default class Resumo extends BasePage {

  get url() {
    return '/Resumo';
  }

  get urlAtual() {
    return page.url();
  }

  public async botaoAlterar() {
    const botaoAlterar = await this.getElement('#alterar-disciplinas');

    return botaoAlterar;
  }

  public async verDatas() {
    const verDatasEstatisticaEProbabilidade = await this.getElement('#link-ver-datas');

    return verDatasEstatisticaEProbabilidade;
  }

  public async modalDeDatas() {
    const modalDeDatas = await this.getElement('.v-dialog--active');

    return modalDeDatas;
  }

  public async alterarEstaDesabilitado() {
    const estaDesabilitado = await this.document.$eval('#alterar-disciplinas',
      (el: any) => el.getAttribute('disabled'));

    return estaDesabilitado !== null;
  }

  public async avalieSuaRematricula() {
    const avalieSuaRematricula = await this.getElement('#clique-aqui');

    return avalieSuaRematricula;
  }

  public async modalDeNPS() {
    const modalDeNPS = await this.getElement('.v-dialog--active');

    return modalDeNPS;
  }

  public async numerosNPS() {
    const numerosNPS = await this.getElements('.v-input--selection-controls__input');

    return numerosNPS;
  }

  public async textoNPS() {
    const textoNPS = await this.getElement('.nps-observacoes');

    return textoNPS;
  }

  public async botaoEnviarNPS() {
    const botaoEnviarNPS = await this.getElement('.botao-enviar');

    return botaoEnviarNPS;
  }

  public async sucessoEnvioNPS() {
    const sucessoEnvioNPS = await this.getElement('.v-dialog--active');

    return sucessoEnvioNPS;
  }
}
