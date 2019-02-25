import { HorarioSemanalRequest } from './HorarioSemanalRequest';
import { HorarioPorDataRequest } from './HorarioPorDataRequest';

export class TurmaComplementarRequest {
  public codigo!: number;
  public horariosDeTurmaSemanal!: HorarioSemanalRequest[];
  public horariosDeTurmaPorData!: HorarioPorDataRequest[];
}
