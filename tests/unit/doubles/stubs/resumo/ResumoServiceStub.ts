import { Horario } from '@/model/Horario';

export class ResumoServiceStub {

  public async obterResumo(codigoDoAluno: number): Promise<Horario[]> {
    const horarioA = new Horario();
    const horarioB = new Horario();

    return new Array<Horario>(horarioA, horarioB);
  }
}
