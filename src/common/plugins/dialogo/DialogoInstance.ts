import _Vue from 'vue';
import Dialogo from '@/components/Dialogo.vue';
import DialogoDinamico from '@/components/DialogoDinamico.vue';
import DialogoPageView from '@/model/analytics/DialogoPageView';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { OpcoesDeDialogoDinamico } from '@/model/OpcoesDeDialogoDinamico';

export default class DialogoInstance {
  public instance!: _Vue;

  public abrir(opcoes: OpcoesDeDialogo): Promise<any> {
    this.instance = this.instanciarDialogo(opcoes);
    return this.montarComponente(opcoes.titulo);
  }

  public abrirDialogoDinamico(opcoes: OpcoesDeDialogoDinamico): Promise<any> {
    this.instance = this.instanciarDialogoDinamico(opcoes);
    return this.montarComponente(opcoes.titulo);
  }

  private instanciarDialogo(opcoes: OpcoesDeDialogo): _Vue {
    const DialogExtended = _Vue.extend(Dialogo);
    return new DialogExtended({ propsData: { opcoes } });
  }

  private instanciarDialogoDinamico(opcoes: OpcoesDeDialogoDinamico): _Vue {
    const DialogExtended = _Vue.extend(DialogoDinamico);
    return new DialogExtended({ propsData: { opcoes } });
  }

  private montarComponente(tituloDoDialogo: string): Promise<any>  {
    this.instance.$analytics.track(new DialogoPageView(tituloDoDialogo));

    this.instance.$mount();

    return new Promise((resolve, reject) => {
      this.instance.$on('confirmar', () => this.tratarPromise(resolve));
      this.instance.$on('rejeitar', () => this.tratarPromise(reject));
    });
  }

  private tratarPromise(callBack: any) {
    this.instance.$destroy();
    callBack();
  }
}
