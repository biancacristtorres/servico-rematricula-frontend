import { state } from '@/store/condicaoEspecial/state';
import mutations, { MutationsTypes } from '@/store/condicaoEspecial/mutations';
import actions from '@/store/condicaoEspecial/actions';
import { CondicaoEspecialApiStub } from '../../doubles/stubs/interesse/CondicaoEspecialApiStub';
import { FactoryStoreBase } from '../FactoryStoreBase';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import getters from '@/store/condicaoEspecial/getters';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

export class CondicaoEspecialFactory extends FactoryStoreBase {

  public dadoOStateCom(...solicitadas: CondicaoEspecial[]) {
    this.store.commit(MutationsTypes.SET_SOLICITADAS, solicitadas);
  }

  public espionarGetDaApi(): void {
    this.espiao = jest.spyOn(CondicaoEspecialApiStub.prototype, 'get');
  }

  public espionarPostDaApi(): void {
    this.espiao = jest.spyOn(CondicaoEspecialApiStub.prototype, 'post');
  }

  protected configurarStore(): any {
    return {
      state: Object.assign(state, { solicitadas: [] }),
      mutations,
      actions,
      getters,
    };
  }

  protected stubarApi(): void {
    Container.bind(HttpService).to(CondicaoEspecialApiStub);
  }
}
