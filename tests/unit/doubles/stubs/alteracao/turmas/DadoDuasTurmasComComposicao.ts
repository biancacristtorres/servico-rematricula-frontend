import { StubBase } from '../../StubBase';
import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';

export class DadoDuasTurmasComComposicao extends StubBase {

  protected dadoUmResponse(): any {
    const turmaComplementar11 = new TurmaComplementar();
    turmaComplementar11.codigo = 11;

    const turmaComplementar22 = new TurmaComplementar();
    turmaComplementar22.codigo = 22;

    const turmaSelecionada = new Turma();
    turmaSelecionada.codigo = 1;
    turmaSelecionada.eTurmaAtual = true;
    turmaSelecionada.complementares = [turmaComplementar11];

    const turmaNaoSelecionada = new Turma();
    turmaNaoSelecionada.codigo = 2;
    turmaNaoSelecionada.eTurmaAtual = false;
    turmaNaoSelecionada.complementares = [turmaComplementar22];


    return new Array<Turma> (
      turmaSelecionada,
      turmaNaoSelecionada,
    );
  }

}
