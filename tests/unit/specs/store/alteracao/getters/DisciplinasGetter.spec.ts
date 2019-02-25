import {
  DisciplinasGetterFactory,
} from '../../../../factory/store/alteracao/getters/DisciplinasGetterFactory';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';

describe('store > alteracao > getters > disciplinas', () => {
  const factory = new DisciplinasGetterFactory();

  beforeEach(() => {
    factory.injetarAPI();
    factory.dadoUmaStoreVazia();
  });

  afterEach(() => {
    factory.restaurarEstadoInicial();
  });

  it('Recupera disciplina pelo código', async (done) => {
    factory.dadoOStateComCalculoI();

    const disciplina = factory.store.getters[AlteracaoGetterTypes.DISCIPLINA](factory.codigoCalculoI);

    const calculoI = new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false);
    expect(disciplina).toEqual(calculoI);

    done();
  });

});
