import { InformacoesAluno } from '@/model/InformacoesAluno';
import { Turma } from '@/model/Turma';

export class AlertasDeAlteracaoRequest {
  public turma: Turma;
  public informacoesAluno: InformacoesAluno;

  constructor(turma: Turma, informacoesAluno: InformacoesAluno) {
    this.turma = turma;
    this.informacoesAluno = informacoesAluno;
  }
}
