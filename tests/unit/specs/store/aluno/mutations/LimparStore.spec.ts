import {
  LimsparStoreMutationFactory,
} from '../../../../factory/store/aluno/LimsparStoreMutationFactory';
import { AlunoMutationTypes } from '@/store/aluno/mutations';

describe('store > aluno > mutations', () => {
  const factory = new LimsparStoreMutationFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Uma mutation retorna o state para o estado inicial', async (done) => {
    factory.dadoQueAStorePossuaInformacoesDeAluno();

    factory.store.commit(AlunoMutationTypes.LIMPAR_STORE);

    expect(factory.store.state.informacoesAluno).toBeUndefined();
    done();
  });

});
