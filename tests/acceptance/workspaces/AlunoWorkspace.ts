import Aluno from '../personas/model/Aluno';

class AlunoWorkspace {
  private aluno: Aluno;

  constructor() {
    this.aluno = new Aluno();
  }

  public setarPersona(nome: string): void {
    this.aluno = personasDeAluno[nome];
  }

  public get persona(): Aluno {
    return this.aluno;
  }
}

export default AlunoWorkspace;
