import { StubBase } from '../../StubBase';
import { Turma } from '@/model/Turma';

export class DadoDuasTurmasEquivalentes extends StubBase {

  protected dadoUmResponse(): any {
    const turma48 = new Turma();
    turma48.codigo = 48;

    const turma49 = new Turma();
    turma49.codigo = 49;

    return [ turma48, turma49];
  }

}
