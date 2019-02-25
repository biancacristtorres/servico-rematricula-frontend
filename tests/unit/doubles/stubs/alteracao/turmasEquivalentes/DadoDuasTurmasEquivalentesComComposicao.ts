import { StubBase } from '../../StubBase';
import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';

export class DadoDuasTurmasEquivalentesComComposicao extends StubBase {

  protected dadoUmResponse(): any {
    const turmaComplementar488 = new TurmaComplementar();
    turmaComplementar488.codigo = 488;

    const turmaComplementar499 = new TurmaComplementar();
    turmaComplementar499.codigo = 499;

    const turma48 = new Turma();
    turma48.codigo = 48;
    turma48.complementares = [turmaComplementar488];

    const turma49 = new Turma();
    turma49.codigo = 49;
    turma49.complementares = [turmaComplementar499];

    return [ turma48, turma49];
  }

}
