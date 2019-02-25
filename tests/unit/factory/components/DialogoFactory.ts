import { shallowMount, Wrapper } from '@vue/test-utils';
import Dialogo from '@/components/Dialogo.vue';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { FactoryComponentBase } from '../FactoryComponentBase';

export class DialogoFactory extends FactoryComponentBase<Dialogo> {

  private idDoTitulo: string = '#titulo';
  private idDoTexto: string = '#texto';
  private opcoesDeDialogo!: OpcoesDeDialogo;

  public criarWrapper(): void {
    this.componente = shallowMount(Dialogo, {
      propsData: {
        opcoes: this.opcoesDeDialogo,
      },
    });
  }

  public dadoAsOpcoes(opcoes: OpcoesDeDialogo): void {
    this.opcoesDeDialogo = opcoes;
  }

  public botaoConfirmar(): Wrapper<any> {
    return this.componente.find('#confirmar');
  }

  public botaoRejeitar(): Wrapper<any> {
    return this.componente.find('#rejeitar');
  }

  public clicarNoBotaoConfirmar(): void {
    this.botaoConfirmar().trigger('click');
  }

  public clicarNoBotaoRejeitar(): void {
    this.botaoRejeitar().trigger('click');
  }

  public get oEventoConfirmarFoiEmitido(): boolean {
    return Boolean(this.componente.emitted().confirmar);
  }

  public get oEventoRejeitarFoiEmitido(): boolean {
    return Boolean(this.componente.emitted().rejeitar);
  }

  public get textoDoBotaoConfirmar(): string {
    return this.botaoConfirmar().text();
  }

  public get textoDoBotaoRejeitar(): string {
    return this.botaoRejeitar().text();
  }

  public get tituloDoDialogo(): string {
    return this.componente.find(this.idDoTitulo).text();
  }

  public get textoDoDialogo(): string {
    return this.componente.find(this.idDoTexto).text();
  }
}
