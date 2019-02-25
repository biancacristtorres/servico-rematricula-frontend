import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils';
import Ajuda from '@/pages/Ajuda.vue';
import store from '@/store';

export class AjudaFactory {

  public rota: string = '';
  public paginaDeAjuda!: Wrapper<Ajuda>;
  public redirecionamento!: (rota: string) => any;

  public montarPagina(): void {
    const localVueSingle = createLocalVue();
    localVueSingle.config.silent = true;

    this.paginaDeAjuda = shallowMount(Ajuda,
      {
        localVue: localVueSingle,
        store,
      });
  }
}
