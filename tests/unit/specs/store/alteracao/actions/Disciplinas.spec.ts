import {
  DisciplinasActionFactory,
} from '../../../../factory/store/alteracao/actions/DisciplinasActionFactory';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';

describe('store > alteracao > actions > disciplinas', () => {
  const codigoDoAluno = 1767;
  const factory = new DisciplinasActionFactory();

  beforeEach(() => {
    factory.injetarAPI();
    factory.dadoUmaStoreVazia();
    factory.espionarApi();
  });

  afterEach(() => {
    factory.restaurarEstadoInicial();
  });

  it('A action requisita uma API e preenche o state de disciplinas', async (done) => {
    await factory.store.dispatch(AlteracaoActionTypes.DISCIPLINAS, codigoDoAluno);

    const esperado = [
      new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false),
      new Disciplina(2, 'Física II', SituacaoDaDisciplina.Liberada, '3B', false),
    ];
    expect(factory.store.state.disciplinas).toEqual(esperado);
    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });

});
