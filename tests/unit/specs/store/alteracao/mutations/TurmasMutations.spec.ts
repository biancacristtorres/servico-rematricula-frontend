import {
  TurmasMutationFactory,
} from '../../../../factory/store/alteracao/mutations/TurmasMutationFactory';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';
import { AlternarTurmaAtualRequest } from '@/store/alteracao/request/AlternarTurmaAtualRequest';

describe('store > alteracao > mutations', () => {
  const factory = new TurmasMutationFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Seta as turmas', async (done) => {
    factory.dadoOStateComCalculoI();

    factory.store.commit(
      AlteracaoMutationsTypes.SET_TURMAS,
      factory.tumasMutationRequest,
    );

    expect(factory.stateDeCalculoI.turmas)
      .toContainEqual(factory.turma);

    done();
  });

  it('Seta as turmas equivalentes', async (done) => {
    factory.dadoOStateComCalculoI();

    factory.store.commit(
      AlteracaoMutationsTypes.SET_TURMAS_EQUIVALENTES,
      factory.tumasEquivalentesMutationRequest,
    );

    expect(factory.stateDeCalculoI.turmasEquivalentes)
      .toContainEqual(factory.turmaEquivalente);

    done();
  });

  it('Seta as turmas especiais', async (done) => {
    factory.dadoOStateComCalculoI();

    factory.store.commit(
      AlteracaoMutationsTypes.SET_TURMAS_ESPECIAIS,
      factory.turmasEspeciaisMutationRequest,
    );

    expect(factory.stateDeCalculoI.turmasEspeciais).
      toContainEqual(factory.turmaEspecial);

    done();
  });

  it('Ao marcar uma turma como atual, o estado das outras turmas se torna falso', async (done) => {
    const calculoI = factory.calculoI();
    calculoI.turmas = [factory.turmaAtual];
    calculoI.turmasEquivalentes = [factory.turmaEquivalente];
    calculoI.turmasEspeciais = [factory.turmaEspecial];

    factory.dadoOStateDeDisciplinasCom(calculoI);

    const request = new AlternarTurmaAtualRequest(calculoI.codigo, factory.turmaEquivalente.codigoUnico);

    factory.store.commit(
      AlteracaoMutationsTypes.ALTERNAR_TURMA_ATUAL,
      request,
    );

    expect(factory.stateDeCalculoI.turmas[0].eTurmaAtual).toBeFalsy();
    expect(factory.stateDeCalculoI.turmasEspeciais[0].eTurmaAtual).toBeFalsy();
    expect(factory.stateDeCalculoI.turmasEquivalentes[0].eTurmaAtual).toBeTruthy();

    done();
  });

});
