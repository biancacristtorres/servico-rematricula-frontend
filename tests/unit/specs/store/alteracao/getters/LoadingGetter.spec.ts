import {
  LoadingGetterFactory,
} from '../../../../factory/store/alteracao/getters/LoadingGetterFactory';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';

describe('store > alteracao > getters > loading', () => {

  const factory = new LoadingGetterFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Quando alterando é falso, mas preparando turmas é verdadeiro, então está carregando', async (done) => {
    factory.dadoAlterando(false);
    factory.dadoPreparandoTurmas(true);

    const atual = await factory.store.getters[AlteracaoGetterTypes.ESTA_CARREGANDO];

    expect(atual).toBeTruthy();
    done();
  });

  it('Quando alterando é verdadeiro, mas preparando turmas é falso, então está carregando', async (done) => {
    factory.dadoAlterando(true);
    factory.dadoPreparandoTurmas(false);

    const atual = await factory.store.getters[AlteracaoGetterTypes.ESTA_CARREGANDO];

    expect(atual).toBeTruthy();
    done();
  });

  it('Quando ambos são falsos, então não está carregando', async (done) => {
    factory.dadoAlterando(false);
    factory.dadoPreparandoTurmas(false);

    const atual = await factory.store.getters[AlteracaoGetterTypes.ESTA_CARREGANDO];

    expect(atual).toBeFalsy();
    done();
  });
});
