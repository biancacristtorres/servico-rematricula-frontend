import {
  TurmasEspeciaisActionFactory,
} from '../../../../factory/store/alteracao/actions/TurmasEspeciaisActionFactory';
import { TurmasActionRequest } from '@/store/alteracao/request/TurmasActionRequest';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';

describe('store > alteracao > actions > turmas especiais', () => {
  const factory = new TurmasEspeciaisActionFactory();

  beforeEach(() => {
    factory.injetarAPI();
    factory.dadoUmaStoreVazia();
    factory.espionarApi();
  });

  afterEach(() => {
    factory.restaurarEstadoInicial();
  });

  it('Preenche o state de turmas especiais', async (done) => {
    const codigoDoAluno = 1767;
    const calculoI = factory.calculoI();
    factory.dadoOStateDeDisciplinasCom(calculoI);

    const request = new TurmasActionRequest(calculoI.codigo, codigoDoAluno);
    await factory.store.dispatch(AlteracaoActionTypes.TURMAS_ESPECIAIS, request);

    const disciplinaEsperada = calculoI;
    disciplinaEsperada.turmas = [ factory.turmaEspecial ];

    expect(factory.store.state.disciplinas).toContainEqual(disciplinaEsperada);
    expect(factory.espiao).toHaveBeenCalledTimes(1);
    done();
  });

});
