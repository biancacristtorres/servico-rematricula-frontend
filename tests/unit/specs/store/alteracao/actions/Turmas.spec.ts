import {
  TurmasActionFactory,
} from '../../../../factory/store/alteracao/actions/TurmasActionFactory';
import { TurmasActionRequest } from '@/store/alteracao/request/TurmasActionRequest';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';

describe('store > alteracao > actions > turmas', () => {
  const codigoDoAluno = 1767;
  const factory = new TurmasActionFactory();

  beforeEach(() => {
    factory.injetarAPI();
    factory.dadoUmaStoreVazia();
    factory.espionarApi();
  });

  afterEach(() => {
    factory.restaurarEstadoInicial();
  });

  it('A action requisita uma API e preenche o state de turmas', async (done) => {
    const request = new TurmasActionRequest(factory.codigoCalculoI, codigoDoAluno);
    factory.dadoOStateComCalculoI();

    await factory.store.dispatch(AlteracaoActionTypes.TURMAS, request);

    const estadoEsperado = new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false);
    estadoEsperado.turmas = [
      factory.turmaSelecionadaComComplementar,
      factory.turmaNaoSelecionadaComComplementar,
    ];

    expect(factory.store.state.disciplinas).toContainEqual(estadoEsperado);
    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });

});
