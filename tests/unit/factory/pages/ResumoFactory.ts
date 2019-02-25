import { Wrapper, shallowMount } from '@vue/test-utils';
import Resumo from '@/pages/Resumo.vue';

export class ResumoFactory {
  public paginaDeResumo!: Wrapper<Resumo>;

  public montarPagina(): void {
    this.paginaDeResumo = shallowMount(Resumo);
  }
}
