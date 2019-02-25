import {
  LimparStoreDeResumoFactory,
} from '../../../../factory/store/resumo/LimparStoreDeResumoFactory';
import { ResumoMutationTypes } from '@/store/resumo/mutations';

describe('store > resumo > mutations', () => {
  const factory = new LimparStoreDeResumoFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Uma mutation retorna o state do namespace de Resumo para o estado inicial', async (done) => {
    factory.dadoQueAStorePossuaInformacoesDeResumo();

    factory.store.commit(ResumoMutationTypes.LIMPAR_STORE);

    expect(factory.store.state.horarios).toEqual([]);
    expect(factory.store.state.disciplinasSemHorario).toEqual([]);
    expect(factory.store.state.existemDisciplinas).toEqual(true);
    expect(factory.store.state.existemDisciplinasNaFilaDeEspera).toEqual(false);
    done();
  });

});
