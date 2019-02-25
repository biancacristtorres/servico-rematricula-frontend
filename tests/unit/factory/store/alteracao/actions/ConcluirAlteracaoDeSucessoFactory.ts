import { FactoryStoreAlteracaoBase } from '../FactoryStoreAlteracaoBase';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoDuasDisciplinasDisponiveis,
} from '../../../../doubles/stubs/alteracao/disciplinasDisponiveis/DadoDuasDisciplinasDisponiveis';
import { Turma } from '@/model/Turma';
import { Disciplina } from '@/model/Disciplina';

export class ConcluirAlteracaoDeSucessoFactory extends FactoryStoreAlteracaoBase {

  public get turmaEquivalente(): Turma {
    const turma = new Turma();
    turma.codigo = 2;
    turma.codigoUnico = '2';
    return turma;
  }

  public get turmaEspecial(): Turma {
    const turma = new Turma();
    turma.codigo = 3;
    turma.codigoUnico = '3';
    turma.eTurmaAtual = true;
    return turma;
  }

  public get turmaAtual(): Turma {
    const turmaAtual = new Turma();
    turmaAtual.codigo = 4;
    turmaAtual.codigoUnico = '4';
    turmaAtual.eTurmaAtual = true;
    return turmaAtual;
  }

  public dadoCalculoIComTurmas(): void {
    const calculoI = this.calculoI();
    calculoI.turmas = [this.turmaAtual];
    calculoI.turmasEquivalentes = [this.turmaEquivalente];
    calculoI.turmasEspeciais = [this.turmaEspecial];

    this.dadoOStateDeDisciplinasCom(calculoI);
  }

  public get stateDeCalculoI(): Disciplina {
    return this.store.state.disciplinas.find(
      (d: Disciplina) => d.codigo === this.codigoCalculoI,
    );
  }

  protected stubarApi(): void {
    Container.bind(HttpService).to(DadoDuasDisciplinasDisponiveis);
  }

}
