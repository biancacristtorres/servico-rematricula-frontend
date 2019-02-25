import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import {
  LoadingsActionFactory,
} from '../../../../factory/store/alteracao/actions/LoadingsActionFactory';

describe('store > alteracao > actions > loadings', () => {

  const factory = new LoadingsActionFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Muda o estado de alterando para verdadeiro quando está alterando turma', async (done) => {
    await factory.store.dispatch(AlteracaoActionTypes.ALTERANDO_TURMAS);

    const atual = factory.store.state.alterando;
    expect(atual).toBeTruthy();

    done();
  });

  it('Muda o estado de alterando para falso quando a alteração de turma é finalizada', async (done) => {
    await factory.store.dispatch(AlteracaoActionTypes.ALTERACAO_FINALIZADA);

    const atual = factory.store.state.alterando;
    expect(atual).toBeFalsy();

    done();
  });

  it('Muda o estado de preparando turmas para verdadeiro quando está preparando turmas', async (done) => {
    await factory.store.dispatch(AlteracaoActionTypes.PREPARANDO_TURMAS);

    const atual = factory.store.state.preparandoTurmas;
    expect(atual).toBeTruthy();

    done();
  });

  it('Muda o estado de preparando turmas para falso quando não está preparando turmas', async (done) => {
    await factory.store.dispatch(AlteracaoActionTypes.PREPARACAO_FINALIZADA);

    const atual = factory.store.state.preparandoTurmas;
    expect(atual).toBeFalsy();

    done();
  });
});
