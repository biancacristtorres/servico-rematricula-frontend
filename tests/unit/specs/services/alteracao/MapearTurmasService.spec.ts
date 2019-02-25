import {
  MapearTurmasServiceFactory,
} from '../../../factory/services/alteracao/MapearTurmasServiceFactory';


describe('service > MapearNovoEstadoDeTurmasService', () => {
  const factory = new MapearTurmasServiceFactory();

  it('A nova turma atual fica com estado verdadeiro e as outras turmas ficam com o estado falso', async (done) => {
    const turmas = [ factory.turmaAtualA, factory.turmaNaoAtualB, factory.turmaNaoAtualC];

    const atual = factory.servico.alternarTurmaAtual(turmas, factory.turmaNaoAtualB.codigoUnico);

    expect(atual[0].eTurmaAtual).toBeFalsy();
    expect(atual[1].eTurmaAtual).toBeTruthy();
    expect(atual[2].eTurmaAtual).toBeFalsy();

    done();
  });

  it('Quando não existe uma nova turma atual, todas as turmas ficam com o estado falso', async (done) => {
    const turmas = [ factory.turmaAtualA, factory.turmaNaoAtualB, factory.turmaNaoAtualC];

    const atual = factory.servico.alternarTurmaAtual(turmas);

    expect(atual[0].eTurmaAtual).toBeFalsy();
    expect(atual[1].eTurmaAtual).toBeFalsy();
    expect(atual[2].eTurmaAtual).toBeFalsy();

    done();
  });

  it('Quando se trata de uma remoção de turma, todas as turmas ficam com o estado falso', async (done) => {
    const turmas = [ factory.turmaAtualA, factory.turmaAtualD];

    const atual = factory.servico.alternarTurmaAtual(turmas, '1', true);

    expect(atual[0].eTurmaAtual).toBeFalsy();
    expect(atual[1].eTurmaAtual).toBeFalsy();

    done();
  });
});
