import { Turma } from '@/model/Turma';
import { SelecaoDeTurmaRequest } from './request/SelecaoDeTurmaRequest';
import { TurmaRequest } from './request/TurmaRequest';
import { TurmaComplementarRequest } from './request/TurmaComplementarRequest';
import { TurmaComplementar } from '@/model/TurmaComplementar';

export class RequestDeSelecaoDeTurmaService {

  public obterPor(codigoDaDisciplina: number, nomeDaDisciplina: string, turma: Turma): SelecaoDeTurmaRequest {
    const request = new SelecaoDeTurmaRequest();

    request.codigoDaDisciplina = codigoDaDisciplina;
    request.nomeDaDisciplina = nomeDaDisciplina;
    request.turma = this.turmaRequestPor(turma);

    return request;
  }

  private turmaRequestPor(turma: Turma): TurmaRequest {
    const turmaRequest = new TurmaRequest();

    turmaRequest.codigo = turma.codigo;
    turmaRequest.codigoUnico = turma.codigoUnico;
    turmaRequest.codigoDaDisciplina = turma.codigoDaDisciplina;
    turmaRequest.horariosDeTurmaSemanal = turma.horariosDeTurmaSemanal.map((h) => h);
    turmaRequest.horariosDeTurmaPorData = turma.horariosDeTurmaPorData.map((h) => h);
    turmaRequest.complementares = this.turmaComplementarRequestPor(turma.complementares);
    turmaRequest.nomeTurma = turma.descricao;
    turmaRequest.cursoTurma = turma.curso;

    return turmaRequest;
  }

  private turmaComplementarRequestPor(complementares: TurmaComplementar[]): TurmaComplementarRequest[] {
    return complementares.map(
      (complementar: TurmaComplementar) => {
        const turmaComplementarRequest = new TurmaComplementarRequest();

        turmaComplementarRequest.codigo = complementar.codigo;
        turmaComplementarRequest.horariosDeTurmaSemanal = complementar.horariosDeTurmaSemanal.map((h) => h);
        turmaComplementarRequest.horariosDeTurmaPorData = complementar.horariosDeTurmaPorData.map((h) => h);

        return turmaComplementarRequest;
      });
  }

}
