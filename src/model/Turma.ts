import { TurmaComplementar } from './TurmaComplementar';
import { TurmaBase } from './TurmaBase';

export class Turma extends TurmaBase {
  public codigoUnico!: string;
  public codigoDaDisciplina!: number;
  public codigoPeriodicidade!: number;
  public eTurmaAtual!: boolean;
  public complementares!: TurmaComplementar[];
}
