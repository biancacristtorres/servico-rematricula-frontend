import {
  LoadingMutationsFactory,
} from '../../../../factory/store/alteracao/mutations/LoadingMutationsFactory';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';

describe('store > alteracao > mutations > loadings', () => {

  const factory = new LoadingMutationsFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Mutation seta alterando para verdadeiro', async (done) => {
    factory.store.commit(AlteracaoMutationsTypes.SET_ALTERANDO, true);

    const atual = factory.store.state.alterando;
    expect(atual).toBeTruthy();
    done();
  });

  it('Mutation seta alterando para falso', async (done) => {
    factory.store.commit(AlteracaoMutationsTypes.SET_ALTERANDO, false);

    const atual = factory.store.state.alterando;
    expect(atual).toBeFalsy();
    done();
  });

  it('Mutation seta preparando turmas para verdadeiro', async (done) => {
    factory.store.commit(AlteracaoMutationsTypes.SET_PREPARANDO_TURMAS, true);

    const atual = factory.store.state.preparandoTurmas;
    expect(atual).toBeTruthy();
    done();
  });

  it('Mutation seta preparando turmas para falso', async (done) => {
    factory.store.commit(AlteracaoMutationsTypes.SET_PREPARANDO_TURMAS, false);

    const atual = factory.store.state.preparandoTurmas;
    expect(atual).toBeFalsy();
    done();
  });

});
