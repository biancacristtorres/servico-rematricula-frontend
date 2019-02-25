import { StatusDaDisciplina } from '@/common/enum/StatusDaDisciplina';

export class DisciplinaResumo {
  public codigoDisciplina?: number;
  public nomeDisciplina?: string;
  public descricaoTurma?: string;
  public status?: StatusDaDisciplina;
  public ePorData?: boolean;
  public campus?: string;
  public descricaoTipoCargaHoraria?: string;
  public datas?: string[];
  public nomeDisciplinaEquivalente?: string;
}
