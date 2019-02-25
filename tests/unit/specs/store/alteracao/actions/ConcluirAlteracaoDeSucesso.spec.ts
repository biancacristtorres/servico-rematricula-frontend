import {
  ConcluirAlteracaoDeSucessoFactory,
} from '../../../../factory/store/alteracao/actions/ConcluirAlteracaoDeSucessoFactory';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import {
  ConcluirAlteracaoDeSucessoActionRequest,
} from '@/store/alteracao/request/ConcluirAlteracaoDeSucessoActionRequest';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';

describe('store > alteracao > actions > alternar turma atual', () => {
  const factory = new ConcluirAlteracaoDeSucessoFactory();

  beforeEach(() => {
    factory.injetarAPI();
    factory.dadoUmaStoreVazia();
    factory.dadoCalculoIComTurmas();
  });

  afterEach(() => {
    factory.restaurarEstadoInicial();
  });

  it('Ao marcar uma turma como atual, o estado das outras turmas se torna falso', async (done) => {
    const request = new ConcluirAlteracaoDeSucessoActionRequest(
      factory.calculoI().codigo,
      factory.turmaEquivalente.codigoUnico,
    );

    factory.store.dispatch(
      AlteracaoActionTypes.CONCLUIR_ALTERACAO_DE_SUCESSO,
      request,
    );

    expect(factory.stateDeCalculoI.turmas[0].eTurmaAtual).toBeFalsy();
    expect(factory.stateDeCalculoI.turmasEspeciais[0].eTurmaAtual).toBeFalsy();
    expect(factory.stateDeCalculoI.turmasEquivalentes[0].eTurmaAtual).toBeTruthy();

    done();
  });

  it('Quando é uma remoção de turma, a disciplina da turma alterada é liberada', async (done) => {
    const request = new ConcluirAlteracaoDeSucessoActionRequest(
      factory.calculoI().codigo,
      '1',
      true,
    );

    factory.store.dispatch(
      AlteracaoActionTypes.CONCLUIR_ALTERACAO_DE_SUCESSO,
      request,
    );

    expect(factory.stateDeCalculoI.situacao).toEqual(SituacaoDaDisciplina.Liberada);
    done();
  });

  it('Quando não é uma remoção de turma, a disciplina da turma alterada é solicitada', async (done) => {
    const request = new ConcluirAlteracaoDeSucessoActionRequest(
      factory.calculoI().codigo,
      factory.turmaEquivalente.codigoUnico,
      false,
    );

    factory.store.dispatch(
      AlteracaoActionTypes.CONCLUIR_ALTERACAO_DE_SUCESSO,
      request,
    );

    expect(factory.stateDeCalculoI.situacao).toEqual(SituacaoDaDisciplina.Solicitada);
    done();
  });

  it('Ao concluir alteração com sucesso, o estado de possui alteração é verdadeiro', async (done) => {
    const request = new ConcluirAlteracaoDeSucessoActionRequest(factory.calculoI().codigo);

    factory.store.dispatch(AlteracaoActionTypes.CONCLUIR_ALTERACAO_DE_SUCESSO, request);

    const atual = factory.store.getters[AlteracaoGetterTypes.POSSUI_ALTERACAO];
    expect(atual).toBeTruthy();
    done();
  });

  it('Ao limpar alteração, o estado de possui alteração é falso', async (done) => {
    factory.store.dispatch(AlteracaoActionTypes.INFORMAR_ALTERACAO);

    factory.store.dispatch(AlteracaoActionTypes.LIMPAR_ALTERACAO);
    const atual = factory.store.getters[AlteracaoGetterTypes.POSSUI_ALTERACAO];

    expect(atual).toBeFalsy();
    done();
  });
});
