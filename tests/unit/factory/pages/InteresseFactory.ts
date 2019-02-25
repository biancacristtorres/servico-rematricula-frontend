import { Wrapper, shallowMount } from '@vue/test-utils';
import Interesse from '@/pages/Interesse.vue';

export class InteresseFactory {
  public paginaDeInteresse!: Wrapper<Interesse>;

  public montarPagina(): void {
    this.paginaDeInteresse = shallowMount(Interesse);
  }
}
