import { FactoryServiceBase } from '../../FactoryServiceBase';
import { TurmasService } from '@/services/alteracao/TurmasService';
import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';
import {
  DadoDuasTurmas,
} from '../../../doubles/stubs/alteracao/turmas/DadoDuasTurmas';
import {
  DadoDuasTurmasComComposicao,
} from '../../../doubles/stubs/alteracao/turmas/DadoDuasTurmasComComposicao';

export class TurmaServiceFactory extends FactoryServiceBase<TurmasService> {
  public umaDisciplinaQualquer: number = 147591;
  public umAlunoQualquer: number = 175137;

  public get servico(): TurmasService {
    return new TurmasService(this.apiStub);
  }

  public dadoQueApiRetorneDuasTurmas(): void {
    this.apiStub = new DadoDuasTurmas();
  }

  public dadoQueApiRetorneDuasTurmasComComposicao(): void {
    this.apiStub = new DadoDuasTurmasComComposicao();
  }

  public get turmaSelecionada(): Turma {
    const turmaSelecionada = new Turma();
    turmaSelecionada.codigo = 1;
    turmaSelecionada.eTurmaAtual = true;

    return turmaSelecionada;
  }

  public get turmaNaoSelecionada(): Turma {
    const turmaNaoSelecionada = new Turma();
    turmaNaoSelecionada.codigo = 2;
    turmaNaoSelecionada.eTurmaAtual = false;

    return turmaNaoSelecionada;
  }

  public get turmaSelecionadaComComplementar(): Turma {
    const turmaComplementar11 = new TurmaComplementar();
    turmaComplementar11.codigo = 11;

    const turmaSelecionada = new Turma();
    turmaSelecionada.codigo = 1;
    turmaSelecionada.eTurmaAtual = true;
    turmaSelecionada.complementares = [turmaComplementar11];

    return turmaSelecionada;
  }

  public get turmaNaoSelecionadaComComplementar(): Turma {
    const turmaComplementar22 = new TurmaComplementar();
    turmaComplementar22.codigo = 22;

    const turmaNaoSelecionada = new Turma();
    turmaNaoSelecionada.codigo = 2;
    turmaNaoSelecionada.eTurmaAtual = false;
    turmaNaoSelecionada.complementares = [turmaComplementar22];

    return turmaNaoSelecionada;
  }
}
