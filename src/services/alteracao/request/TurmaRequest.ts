import { TurmaComplementarRequest } from './TurmaComplementarRequest';
import { HorarioSemanalRequest } from './HorarioSemanalRequest';
import { HorarioPorDataRequest } from './HorarioPorDataRequest';

export class TurmaRequest {
  public codigo!: number;
  public codigoUnico!: string;
  public codigoDaDisciplina!: number;
  public horariosDeTurmaSemanal!: HorarioSemanalRequest[];
  public horariosDeTurmaPorData!: HorarioPorDataRequest[];
  public complementares!: TurmaComplementarRequest[];
  public nomeTurma!: string;
  public cursoTurma!: string;

}

