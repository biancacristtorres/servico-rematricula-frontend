import {
  TurmasEquivalentesActionFactory,
} from '../../../../factory/store/alteracao/actions/TurmasEquivalentesActionFactory';
import { TurmasActionRequest } from '@/store/alteracao/request/TurmasActionRequest';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';

describe('store > alteracao > actions > turmas equivalentes', () => {
  const codigoDoAluno = 1767;
  const factory = new TurmasEquivalentesActionFactory();

  beforeEach(() => {
    factory.injetarAPI();
    factory.dadoUmaStoreVazia();
    factory.espionarApi();
  });

  afterEach(() => {
    factory.restaurarEstadoInicial();
  });

  it('A action requisita uma API e preenche o state de turmas equivalentes', async (done) => {
    const request = new TurmasActionRequest(factory.codigoCalculoI, codigoDoAluno);
    factory.dadoOStateComCalculoI();

    await factory.store.dispatch(AlteracaoActionTypes.TURMAS_EQUIVALENTES, request);

    const estadoEsperado = new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false);
    estadoEsperado.turmasEquivalentes = [ factory.turma48, factory.turma49 ];

    expect(factory.store.state.disciplinas).toContainEqual(estadoEsperado);
    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });

});
