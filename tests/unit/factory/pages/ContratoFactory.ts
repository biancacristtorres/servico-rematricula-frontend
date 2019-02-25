import { shallowMount } from '@vue/test-utils';
import { FactoryComponentBase } from '../FactoryComponentBase';
import Contrato from '@/pages/Contrato.vue';
import store from '@/store';

export class ContratoFactory extends FactoryComponentBase<Contrato> {

  public criarWrapper(): void {
    this.componente = shallowMount(Contrato, { store });
  }

}
