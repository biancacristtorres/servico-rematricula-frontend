import { StubBase } from '../../StubBase';
import { Turma } from '@/model/Turma';

export class DadoQueNaoRetorneTurmas extends StubBase {

  protected dadoUmResponse(): any {
    return new Array<Turma> ();
  }

}
