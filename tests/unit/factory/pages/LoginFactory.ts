import { shallowMount } from '@vue/test-utils';
import login from '@/pages/login.vue';
import store from '@/store';
import { FactoryComponentBase } from '../FactoryComponentBase';

export class LoginFactory extends FactoryComponentBase<login> {

  public dadoUmLoginInvalido(): void {
    this.componente.setMethods({ fazerLogin: Promise.reject });
  }

  public dadoUmLoginValido(): void  {
    this.componente.setMethods({ fazerLogin: Promise.resolve });
  }

  public criarWrapper(): void {
    this.componente = shallowMount(login, {
      localVue,
      store,
      sync: false,
    });
  }
}
