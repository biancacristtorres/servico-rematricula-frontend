import { AlertasDeAlteracaoRequest } from './request/AlertasDeAlteracaoRequest';
import { Periodicidade } from '@/common/enum/Periodicidade';
import { AlertasDeAlteracaoResponse } from './response/AlertasDeAlteracaoResponse';

export class AlertasDeAlteracaoService {

  public obterAlertasAlteracao(request: AlertasDeAlteracaoRequest): AlertasDeAlteracaoResponse {
    if (!request.turma.eTurmaAtual) {
      const eAlunoAnualComTurmaSemestral = this.eAlunoAnualComTurmaSemestral(
        request.turma.codigoPeriodicidade,
        request.informacoesAluno.codigoPeriodicidade,
        request.informacoesAluno.codigoMarca);

      if (eAlunoAnualComTurmaSemestral) {
        const mensagem = 'Por ser aluno do regime anual com DP ou ADP disponível apenas no regime semestral, '
          + 'fique atento! A disciplina deverá ser paga mesmo após ter o resultado dela no fim do semestre, '
          + 'ou seja, o pagamento se estenderá até dezembro. Deseja continuar?';

        return new AlertasDeAlteracaoResponse([mensagem]);
      }
    }
    return new AlertasDeAlteracaoResponse([]);
  }


  private eAlunoAnualComTurmaSemestral(
    codigoPeriocididadeTurma: number,
    codigoPeriocididadeAluno?: number,
    codigoMarcaAluno?: number,
  ): boolean {

    return (codigoMarcaAluno === 3 &&
        (codigoPeriocididadeAluno === Periodicidade.Anual
          && codigoPeriocididadeTurma === Periodicidade.Semestral));
  }

}
