import { StubBase } from '../../StubBase';
import { Turma } from '@/model/Turma';

export class DadoDuasTurmas extends StubBase {

  protected dadoUmResponse(): any {
    const turmaSelecionada = new Turma();
    turmaSelecionada.codigo = 1;
    turmaSelecionada.eTurmaAtual = true;

    const turmaNaoSelecionada = new Turma();
    turmaNaoSelecionada.codigo = 2;
    turmaNaoSelecionada.eTurmaAtual = false;

    return new Array<Turma> (
      turmaSelecionada,
      turmaNaoSelecionada,
    );
  }

}
