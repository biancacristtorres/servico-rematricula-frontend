import SelecaoDeDisciplinas from '@/components/interesse/SelecaoDeDisciplinas.vue';
import { FactoryComponentBase } from '../FactoryComponentBase';
import { ResponseComTresDisciplinas } from '../../doubles/stubs/interesse/ResponseComTresDisciplinas';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Container } from 'typescript-ioc';
import { mount } from '@vue/test-utils';
import store from '@/store';

export class SelecaoDeDisciplinasFactory extends FactoryComponentBase<SelecaoDeDisciplinas>  {
  private url!: string;

  public dadoQueApiRetorneTresDisciplinas(): void {
    Container.bind(HttpService).to(ResponseComTresDisciplinas);
  }

  public criarWrapper(): void {
    this.componente = mount(SelecaoDeDisciplinas, {
      store,
      mocks: {
        $router: {
          push: (to: string) => {
            this.url = to;
          },
        },
      },
    });
  }
}
