import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { StubBase } from '../../StubBase';

export class DadoDuasDisciplinasDisponiveis extends StubBase {

  protected dadoUmResponse(): any {
    const disciplinas = new Array<Disciplina>(
      new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false),
      new Disciplina(2, 'Física II', SituacaoDaDisciplina.Liberada, '3B', false),
    );

    return disciplinas;
  }
}
