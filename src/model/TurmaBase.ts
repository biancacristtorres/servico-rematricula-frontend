import { HorarioSemanal } from './HorarioSemanal';
import { HorarioPorData } from './HorarioPorData';
import { TipoCargaHoraria } from '@/common/enum/TipoCargaHoraria';

export class TurmaBase {
  public codigo!: number;
  public campus!: string;
  public curso!: string;
  public descricao!: string;
  public nomeDaDisciplina!: string;
  public horariosParaExibicao!: string[];
  public horariosDeTurmaSemanal!: HorarioSemanal[];
  public horariosDeTurmaPorData!: HorarioPorData[];
  public eTurmaPorData!: boolean;
  public eDoTurnoDoAluno!: boolean;
  public vagas!: number;
  public numeroDeReserva!: number;
  public minimoParaConfirmacao!: number;
  public codigoTipoCargaHoraria!: TipoCargaHoraria;
}
