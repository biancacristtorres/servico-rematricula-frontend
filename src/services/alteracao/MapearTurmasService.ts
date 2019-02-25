import { Turma } from '@/model/Turma';

export class MapearTurmasService {

  public alternarTurmaAtual(
    turmas: Turma[],
    codigoDaTurmaNovaTurmaAtual?: string,
    eUmaRemocaoDeTurma?: boolean,
    ): Turma[] {

    const novasTurmas = turmas.map((turma: Turma) => {
      if (!eUmaRemocaoDeTurma) {
        return turma.codigoUnico === codigoDaTurmaNovaTurmaAtual ?
          Object.assign({}, turma, { eTurmaAtual: true }) :
          Object.assign({}, turma, { eTurmaAtual: false });
      } else {
        return Object.assign({}, turma, { eTurmaAtual: false });
      }
    });

    return novasTurmas;
  }

}
