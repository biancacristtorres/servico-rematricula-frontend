import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { StubBase } from '../../StubBase';

export class DadoUmaDisciplinasDisponiveisComEquivalenciaDoisPorUm extends StubBase {

  protected dadoUmResponse(): any {
    const disciplina = new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false);
    disciplina.possuiEquivalenciaDoisPorUm = true;

    const disciplinas = new Array<Disciplina>(
      disciplina,
    );

    return disciplinas;
  }
}
