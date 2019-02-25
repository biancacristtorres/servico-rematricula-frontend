import { FactoryStoreBase } from '../../FactoryStoreBase';
import { state, MarcaState } from '@/store/marca/state';
import getters from '@/store/marca/getters';

export class MarcaGetterFactory extends FactoryStoreBase {

  protected stubarApi(): void {
    throw new Error('Method not implemented.');
  }

  protected configurarStore() {
    return {
      state,
      getters,
    };
  }

}
