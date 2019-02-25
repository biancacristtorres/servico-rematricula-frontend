import { StubBase } from '../StubBase';
import { DisciplinaSemHorarioBuilder } from '../../../builders/DisciplinaSemHorarioBuilder';

export class DuasDisciplinasSemHorario extends StubBase {

  protected dadoUmResponse(): any {
    const disciplina1 = DisciplinaSemHorarioBuilder
                        .dadosAsOpcoes()
                        .semDisciplinaEquivalente()
                        .opcoes;
    const disciplina2 = DisciplinaSemHorarioBuilder
                        .dadosAsOpcoes()
                        .comDisciplinaEquivalente()
                        .opcoes;

    return [ disciplina1, disciplina2 ] ;
  }

}
