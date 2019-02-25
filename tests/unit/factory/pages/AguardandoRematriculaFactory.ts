import { Wrapper, shallowMount } from '@vue/test-utils';
import AguardandoRematricula from '@/pages/AguardandoRematricula.vue';

export class AguardandoRematriculaFactory {
  public paginaDeAguardandoRematricula!: Wrapper<AguardandoRematricula>;

  public montarPagina(): void {
    this.paginaDeAguardandoRematricula = shallowMount(AguardandoRematricula);
  }
}
