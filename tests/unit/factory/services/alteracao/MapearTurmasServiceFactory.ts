import { Turma } from '@/model/Turma';
import { MapearTurmasService } from '@/services/alteracao/MapearTurmasService';

export class MapearTurmasServiceFactory {
  public get turmaAtualA(): Turma {
    const turmaAtual = new Turma();
    turmaAtual.codigo = 1;
    turmaAtual.codigoUnico = '1';
    turmaAtual.eTurmaAtual = true;
    return turmaAtual;
  }

  public get turmaNaoAtualB(): Turma {
    const turmaNaoAtual = new Turma();
    turmaNaoAtual.codigo = 2;
    turmaNaoAtual.codigoUnico = '2';
    turmaNaoAtual.eTurmaAtual = false;
    return turmaNaoAtual;
  }

  public get turmaNaoAtualC(): Turma {
    const turmaNaoAtual = new Turma();
    turmaNaoAtual.codigo = 3;
    turmaNaoAtual.codigoUnico = '3';
    turmaNaoAtual.eTurmaAtual = false;
    return turmaNaoAtual;
  }

  public get turmaAtualD(): Turma {
    const turmaAtual = new Turma();
    turmaAtual.codigo = 4;
    turmaAtual.codigoUnico = '4';
    turmaAtual.eTurmaAtual = true;
    return turmaAtual;
  }

  public get servico(): MapearTurmasService {
    return new MapearTurmasService();
  }

}
