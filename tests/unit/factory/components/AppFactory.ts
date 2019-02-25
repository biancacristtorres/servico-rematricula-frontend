import { FactoryComponentBase } from '../FactoryComponentBase';
import App from '@/App.vue';
import { shallowMount } from '@vue/test-utils';
import store, { StoreNamespaces } from '@/store';
import { AlunoActionTypes } from '@/store/aluno/actions';

export class AppFactory extends FactoryComponentBase<App> {

  public dadoQueObterInformacoesNaoEstaCarregando(): void {
    store.dispatch(`${ StoreNamespaces.ALUNO }/${ AlunoActionTypes.INFORMACOES_ALUNO_OBTIDAS }`);
  }

  public dadoQueObterInformacoesEstaCarregando(): void {
    store.dispatch(`${ StoreNamespaces.ALUNO }/${ AlunoActionTypes.OBTENDO_INFORMACOES_ALUNO }`);
  }

  public criarWrapper(): void {
    this.componente = shallowMount(App, { store });
  }

}
