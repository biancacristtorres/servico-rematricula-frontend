import dummy from '../../utils/dummy.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { DialogoPlugin } from '@/common/plugins/dialogo';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { OpcoesDeDialogoDinamico } from '@/model/OpcoesDeDialogoDinamico';

export class DialogoPluginFactory {
  private dummyPage!: Wrapper<any>;

  public montarPlugin(): void {
    localVue.use(DialogoPlugin);
    this.criarUmaDummyPage();
  }

  public solicitarAberturaDoDialogo(opcoes: OpcoesDeDialogo): Promise<any> {
    return this.dummyPage.vm.$dialogo.abrir(opcoes);
  }

  public solicitarAberturaDoDialogoDinamico(opcoes: OpcoesDeDialogoDinamico): Promise<any> {
    return this.dummyPage.vm.$dialogo.abrirDialogoDinamico(opcoes);
  }

  public emitirEventoConfirmar(): void {
    this.dummyPage.vm.$dialogo.instance.$emit('confirmar');
  }

  public emitirEventoRejeitar(): void {
    this.dummyPage.vm.$dialogo.instance.$emit('rejeitar');
  }

  private criarUmaDummyPage() {
    this.dummyPage = shallowMount(dummy, { localVue });
  }

}
