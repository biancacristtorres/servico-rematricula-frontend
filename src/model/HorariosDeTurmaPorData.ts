import { ModelDeDialogoDinamico } from './ModelDeDialogoDinamico';
import { HorarioPorData } from './HorarioPorData';

export class HorariosDeTurmaPorData extends ModelDeDialogoDinamico {
  public nomeDaDisciplina: string;
  public descricaoDaTurma: string;
  public horariosDeTurmaPorData: HorarioPorData[];

  constructor(nomeDaDisciplina: string, descricaoDaTurma: string, horariosDeTurmaPorData: HorarioPorData[]) {
    super();
    this.nomeDaDisciplina = nomeDaDisciplina;
    this.descricaoDaTurma = descricaoDaTurma;
    this.horariosDeTurmaPorData = horariosDeTurmaPorData;
  }
}
