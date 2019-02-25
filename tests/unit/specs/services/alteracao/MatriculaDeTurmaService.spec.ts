import {
  MatriculaDeTurmaFactory,
} from '../../../factory/services/alteracao/MatriculaDeTurmaFactory';
import { AlteracaoResponse } from '@/services/alteracao/response/AlteracaoResponse';

describe('services > alteracao > serciço para matrícula em turma', () => {

  const factory = new MatriculaDeTurmaFactory();

  it('Uma matrícula de turma com sucesso retorna uma nova mini grade', async (done) => {
    factory.dadoQueAPIFacaUmaMatriculaEmTurmaComSucesso();

    const response: AlteracaoResponse = await factory.servico.processar(factory.dadoUmRequest);

    expect(response.sucesso).toBeTruthy();
    expect(response.miniGrade).toEqual(factory.miniGradeEsperada);
    done();
  });

  it('Ao falhar uma matrícula de turma, um feedback é retornado', async (done) => {
    factory.dadoQueAPIFalheAoFazerUmaMatriculaEmTurma();

    const response: AlteracaoResponse = await factory.servico.processar(factory.dadoUmRequest);

    expect(response.sucesso).toBeFalsy();
    expect(response.opcoesDeDialogo).toEqual(factory.feedbackEsperado);
    done();
  });

});
