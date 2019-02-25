import {
  CancelamentoDeMatriculaFactory,
} from '../../../factory/services/alteracao/CancelamentoDeMatriculaFactory';
import { AlteracaoResponse } from '@/services/alteracao/response/AlteracaoResponse';

describe('services > alteracao > serciço para cancelamento de matrícula', () => {
  const factory = new CancelamentoDeMatriculaFactory();

  it('Uma remoção de turma com sucesso retorna uma nova mini grade', async (done) => {
    factory.dadoQueAPIFacaUmCancelamentoDeMatriculaComSucesso();

    const response: AlteracaoResponse = await factory.servico.processar(factory.dadoUmRequest);

    expect(response.sucesso).toBeTruthy();
    expect(response.miniGrade).toEqual(factory.miniGradeEsperada);
    done();
  });

  it('Ao falhar uma remoção de turma, um feedback é retornado', async (done) => {
    factory.dadoQueAPIFalheAoFazerUmCancelamentoDeMatricula();

    const response: AlteracaoResponse = await factory.servico.processar(factory.dadoUmRequest);

    expect(response.sucesso).toBeFalsy();
    expect(response.opcoesDeDialogo).toEqual(factory.feedbackEsperado);
    done();
  });

});
