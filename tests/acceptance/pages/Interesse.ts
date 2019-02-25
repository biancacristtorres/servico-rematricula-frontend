import { BasePage } from 'componente-frontend-core/tests/Page';
import { ElementHandle } from 'puppeteer';

export default class Interesse extends BasePage {

  get url() {
    return '/Interesse';
  }

  get urlAtual() {
    return page.url();
  }

  public async botaoContinuar() {
    const botaoContinuar = await this.getElement('#continuar');

    return botaoContinuar;
  }

  public async botaoSubmeterInteresse() {
    return await this.getElement('#submeter-interesse');
  }

  public async checkboxCalculoDiferencial() {
    return await this.getElement('#disciplina-1');
  }

  public async checkboxGeometriaAnalitica() {
    return await this.getElement('#disciplina-2');
  }

  public async checkboxDesenhoArquitetonico() {
    return await this.getElement('#disciplina-3');
  }

  public async checkboxResistenciaDosMateriais() {
    return await this.getElement('#disciplina-4');
  }

  public async alertaRegrasDeInteresse() {
    return await this.getElement('.scale-transition-enter-active');
  }

  public async checkboxTurmasEspeciais() {
    return await this.getElement('#condicao-especial-1');
  }

  public async checkboxCampusDiferentes() {
    return await this.getElement('#condicao-especial-2');
  }

  public async checkboxTurnosDiferentes() {
    return await this.getElement('#condicao-especial-3');
  }

  public async verificarSeCheckboxEstaDesabilitadoEDesmarcado(check: ElementHandle<Element>) {
    const isChecked = await (await check.getProperty('checked')).jsonValue();
    const isDisabled = await (await check.getProperty('disabled')).jsonValue();
    const validacao = (isChecked === false && isDisabled === true);

    return  validacao === true ? true : false;
  }

  public async desmarcarCheckboxEmLote(...arrayCheck: Array<ElementHandle<Element>>) {
    await arrayCheck.forEach(this.desmarcarCheckbox);
  }

  private async desmarcarCheckbox(check: ElementHandle<Element>) {
    const valorAtual = await (await check.getProperty('checked')).jsonValue();

    if (valorAtual === true) {
      await this.elementClick(check);
    }
  }
}
