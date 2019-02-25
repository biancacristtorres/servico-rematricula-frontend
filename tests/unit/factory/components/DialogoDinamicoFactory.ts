import { shallowMount } from '@vue/test-utils';
import { FactoryComponentBase } from '../FactoryComponentBase';
import { OpcoesDeDialogoDinamico } from '@/model/OpcoesDeDialogoDinamico';
import DialogoDinamico from '@/components/DialogoDinamico.vue';

export class DialogoDinamicoFactory extends FactoryComponentBase<DialogoDinamico> {
  private opcoes!: OpcoesDeDialogoDinamico;

  public get oEventoCancelarFoiEmitido(): boolean {
    return Boolean(this.componente.emitted().rejeitar);
  }

  public get oEventoConfirmarFoiEmitido(): boolean {
    return Boolean(this.componente.emitted().confirmar);
  }

  public dadoAProp(opcoes: OpcoesDeDialogoDinamico): void {
    this.opcoes = opcoes;
  }

  public criarWrapper(): void {
    this.componente = shallowMount(DialogoDinamico, {
      propsData: {
        opcoes: this.opcoes,
      },
    });
  }

}
