import { FactoryServiceBase } from '../../FactoryServiceBase';
import { CancelamentoDeMatriculaService } from '@/services/alteracao/CancelamentoDeMatriculaService';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { DisciplinasPorDiaDeSemanaDaMiniGrade } from '@/model/DisciplinasPorDiaDeSemanaDaMiniGrade';
import { DisciplinaMiniGrade } from '@/model/DisciplinaMiniGrade';
import { AlteracaoRequest } from '@/services/alteracao/request/AlteracaoRequest';
import { Turma } from '@/model/Turma';
import {
  DadoUmaRemocaoDeTurmaComSucesso,
} from '../../../doubles/stubs/alteracao/remocaoDeTurmas/DadoUmaRemocaoDeTurmaComSucesso';
import {
  DadoUmaRemocaoDeTurmaComErro,
} from '../../../doubles/stubs/alteracao/remocaoDeTurmas/DadoUmaRemocaoDeTurmaComErro';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';

export class CancelamentoDeMatriculaFactory extends FactoryServiceBase<CancelamentoDeMatriculaService> {

  public get servico(): CancelamentoDeMatriculaService {
    return new CancelamentoDeMatriculaService(this.apiStub);
  }

  public dadoQueAPIFacaUmCancelamentoDeMatriculaComSucesso(): void {
    this.apiStub = new DadoUmaRemocaoDeTurmaComSucesso();
  }

  public dadoQueAPIFalheAoFazerUmCancelamentoDeMatricula(): void {
    this.apiStub = new DadoUmaRemocaoDeTurmaComErro();
  }

  public get dadoUmRequest(): AlteracaoRequest {
    const codigoDoAluno = 1628;
    const turma = new Turma();
    turma.codigoDaDisciplina = 5792;

    return new AlteracaoRequest(turma, codigoDoAluno, turma.codigoDaDisciplina, 'Calculo');
  }

  public get miniGradeEsperada(): HorarioDaMiniGrade[] {
    const calculoI =  new DisciplinaMiniGrade();
    calculoI.codigoDisciplina = 143924;
    calculoI.nomeDisciplina = 'Cálculo I';

    const horarioDaMiniGrade = new HorarioDaMiniGrade();
    horarioDaMiniGrade.horaInicio = '20:55h';
    horarioDaMiniGrade.disciplinasPorDiaDeSemana = new DisciplinasPorDiaDeSemanaDaMiniGrade();
    horarioDaMiniGrade.disciplinasPorDiaDeSemana[2] = [ calculoI ];
    horarioDaMiniGrade.disciplinasPorDiaDeSemana[5] = [ calculoI ];

    return [ horarioDaMiniGrade ];
  }

  public get feedbackEsperado(): OpcoesDeDialogo {
    return new OpcoesDeDialogo(
      'OPS!',
      'Ocorreu um problema na sua seleção.',
      'OK',
      '',
    );
  }
}
