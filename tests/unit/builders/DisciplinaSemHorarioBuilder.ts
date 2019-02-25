import { DisciplinaSemHorario } from '@/model/DisciplinaSemHorario';

export class DisciplinaSemHorarioBuilder {

  public get opcoes() {
    const model = new DisciplinaSemHorario();
    model.nomeDisciplina = this.nomeDisciplina;
    model.nomeDisciplinaEquivalente = this.nomeDisciplinaEquivalente;
    return model;
  }

  public static dadosAsOpcoes() {
    return new DisciplinaSemHorarioBuilder();
  }
  private nomeDisciplina: string;
  private nomeDisciplinaEquivalente: string;

  private constructor() {
    this.nomeDisciplina = 'Disciplina da Grade 1';
    this.nomeDisciplinaEquivalente = 'Disciplina Equivalente 1';
  }

  public semDisciplinaEquivalente(): DisciplinaSemHorarioBuilder {
    this.nomeDisciplinaEquivalente = '';
    return this;
  }

  public comDisciplinaEquivalente(): DisciplinaSemHorarioBuilder {
    return this;
  }
}
