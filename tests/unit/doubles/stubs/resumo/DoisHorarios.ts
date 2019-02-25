import { StubBase } from '../StubBase';
import { Horario } from '@/model/Horario';

export class DoisHorarios extends StubBase {

  protected dadoUmResponse(): any {
    const horarioA = new Horario();
    const horarioB = new Horario();

    return { horarios : [ horarioA, horarioB ] };
  }

}
