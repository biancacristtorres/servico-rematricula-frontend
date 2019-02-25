import { DiaDaSemana } from '@/common/enum/DiaDaSemana';

export class HorarioSemanalRequest {
  public diaDaSemana!: DiaDaSemana;
  public horaInicio!: Date;
  public horaFim!: Date;
}
