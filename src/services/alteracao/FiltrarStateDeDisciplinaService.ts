import { Disciplina } from '@/model/Disciplina';

export class FiltrarStateDeDisciplinaService {

  public processar(disciplinas: Disciplina[], codigoDaDisciplina: number): any {
    const disciplina = disciplinas.find((d: Disciplina) => d.codigo === codigoDaDisciplina);

    if (disciplina) {
      return disciplina;
    } else {
      throw Error(`Não foi possível encontrar a disciplina de código ${ codigoDaDisciplina }`);
    }
  }

}
