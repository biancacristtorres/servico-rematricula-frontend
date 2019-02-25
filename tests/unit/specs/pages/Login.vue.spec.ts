import store from '@/store';
import login from '@/pages/login.vue';
import { shallowMount } from '@vue/test-utils';
import {
  LoginFactory,
} from '../../factory/pages/LoginFactory';

describe('Página de login', () => {
  const factory = new LoginFactory();

  it('Login invalido', async (done) => {
    factory.montarComponente();
    factory.dadoUmLoginInvalido();

    factory.vueInstance.entrar();

    expect(factory.componente).toMatchSnapshot();

    done();
  });

  it('Login válido', async (done) => {
    factory.componente = shallowMount(login, {
      localVue,
      store,
      sync: false,
      mocks: {
        $router: {
          push: (to: string) => {
            expect(to).toBe('/');
            done();
          },
        },
      },
    });

    factory.dadoUmLoginValido();
    factory.vueInstance.entrar();
    done();
  });
});
