import { FactoryServiceBase } from '../../FactoryServiceBase';
import { MatriculaDeTurmaService } from '@/services/alteracao/MatriculaDeTurmaService';
import { Turma } from '@/model/Turma';
import { AlteracaoRequest } from '@/services/alteracao/request/AlteracaoRequest';
import {
  DadoUmaSelecaoDeTurmaComSucesso,
} from '../../../doubles/stubs/alteracao/selecaoDeTurmas/DadoUmaSelecaoDeTurmaComSucesso';
import {
  DadoUmaSelecaoDeTurmaComErro,
} from '../../../doubles/stubs/alteracao/selecaoDeTurmas/DadoUmaSelecaoDeTurmaComErro';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { DisciplinaMiniGrade } from '@/model/DisciplinaMiniGrade';
import { DisciplinasPorDiaDeSemanaDaMiniGrade } from '@/model/DisciplinasPorDiaDeSemanaDaMiniGrade';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';

export class MatriculaDeTurmaFactory extends FactoryServiceBase<MatriculaDeTurmaService> {

  public get servico(): MatriculaDeTurmaService {
    return new MatriculaDeTurmaService(this.apiStub);
  }

  public dadoQueAPIFacaUmaMatriculaEmTurmaComSucesso(): void {
    this.apiStub = new DadoUmaSelecaoDeTurmaComSucesso();
  }

  public dadoQueAPIFalheAoFazerUmaMatriculaEmTurma(): void {
    this.apiStub = new DadoUmaSelecaoDeTurmaComErro();
  }

  public get dadoUmRequest(): AlteracaoRequest {
    const codigoDoAluno = 1628;
    const turma = new Turma();
    turma.codigoDaDisciplina = 5792;
    turma.horariosDeTurmaSemanal = [];
    turma.horariosDeTurmaPorData = [];
    turma.complementares = [];

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
      'Conflito de horário',
      'Ocorreu um conflito',
      'OK',
      '',
    );
  }
}
