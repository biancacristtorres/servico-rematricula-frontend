import { shallowMount } from '@vue/test-utils';
import store from '@/store';
import SelecaoDeCondicaoEspecial from '@/components/interesse/SelecaoDeCondicaoEspecial.vue';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { CondicaoEspecialApiStub } from '../../doubles/stubs/interesse/CondicaoEspecialApiStub';
import { FactoryComponentBase } from '../FactoryComponentBase';

export class SelecaoDeCondicaoEspecialFactory extends FactoryComponentBase<SelecaoDeCondicaoEspecial> {
  private quantidadeDeDisciplinasComInteresse: number = 3;

  public dadoQueApiRetorneTurmasEspeciais(): void {
    Container.bind(HttpService).to(CondicaoEspecialApiStub);
  }

  public dadoQueNaoExistemDisciplinasComInteresse(): void {
    this.quantidadeDeDisciplinasComInteresse = 0;
  }

  public criarWrapper(): void {
    this.componente = shallowMount(SelecaoDeCondicaoEspecial, {
      propsData: {
        quantidadeDeDisciplinasComInteresse: this.quantidadeDeDisciplinasComInteresse,
      },
      store,
    });
  }

}
