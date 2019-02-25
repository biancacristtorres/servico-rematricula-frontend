import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { FactoryStoreAlteracaoBase } from '../FactoryStoreAlteracaoBase';
import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';
import {
  DadoDuasTurmasComComposicao,
} from '../../../../doubles/stubs/alteracao/turmas/DadoDuasTurmasComComposicao';

export class TurmasActionFactory extends FactoryStoreAlteracaoBase {

  public espionarApi(): void {
    this.espiao = jest.spyOn(DadoDuasTurmasComComposicao.prototype, 'get');
  }

  protected stubarApi(): void {
    Container.bind(HttpService).to(DadoDuasTurmasComComposicao);
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
