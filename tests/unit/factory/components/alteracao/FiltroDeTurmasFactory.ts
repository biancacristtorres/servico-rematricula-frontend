import { FactoryComponentBase } from '../../FactoryComponentBase';
import FiltroDeTurma from '@/components/alteracao/FiltroDeTurma.vue';
import { shallowMount, Wrapper, mount } from '@vue/test-utils';
import { Filtro } from '@/model/Filtro';
import store, { StoreNamespaces } from '@/store';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';

export class FiltroDeTurmasFactory extends FactoryComponentBase<FiltroDeTurma> {
  private model!: Filtro;

  public dadoOModel(filtro: Filtro): void {
    this.model = filtro;
  }

  public criarWrapper(): void {
    this.componente = mount(FiltroDeTurma, {
      store,
    });

    this.componente.setData({
      filtro: this.model,
    });
  }

  public aplicarFiltro(): void {
    const botaoDeAplicarFiltro = this.componente.find('#aplicar-filtro');
    botaoDeAplicarFiltro.trigger('click');
  }

  public get filtroDaStoreDeAlteracao(): Filtro {
    return store.getters[`${ StoreNamespaces.ALTERACAO }/${ AlteracaoGetterTypes.FILTRO }`];
  }

}
