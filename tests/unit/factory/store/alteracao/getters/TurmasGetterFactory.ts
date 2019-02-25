import { FactoryStoreAlteracaoBase } from '../FactoryStoreAlteracaoBase';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { Turma } from '@/model/Turma';
import { Filtro } from '@/model/Filtro';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoDuasDisciplinasDisponiveis,
} from '../../../../doubles/stubs/alteracao/disciplinasDisponiveis/DadoDuasDisciplinasDisponiveis';

export class TurmasGetterFactory extends FactoryStoreAlteracaoBase {
  public dadoCalculoIComTurmasEspeciais(...turmasEspeciais: Turma[]): void {
    const calculoI = this.calculoI();
    calculoI.turmasEspeciais = turmasEspeciais;

    this.dadoOStateDeDisciplinasCom(calculoI);
  }
  public dadoCalculoIComTurmasEquivalentes(...turmasEquivalentes: Turma[]): void {
    const calculoI = this.calculoI();
    calculoI.turmasEquivalentes = turmasEquivalentes;

    this.dadoOStateDeDisciplinasCom(calculoI);
  }

  public dadoCalculoIComTurmas(...turmas: Turma[]): void {
    const calculoI = this.calculoI();
    calculoI.turmas = turmas;

    this.dadoOStateDeDisciplinasCom(calculoI);
  }

  public filtrarPor(filtro: Filtro) {
    this.store.dispatch(AlteracaoActionTypes.ALTERAR_FILTRO, filtro);
  }

  public dadoOStateComCalculoIComTurmas(): void {
    const turma = new Turma();
    turma.codigo = 1;
    turma.eTurmaAtual = true;

    const calculoIComTurmas = this.calculoI();
    calculoIComTurmas.turmas = [turma];

    this.dadoOStateDeDisciplinasCom(calculoIComTurmas);
  }

  protected stubarApi(): void {
    Container.bind(HttpService).to(DadoDuasDisciplinasDisponiveis);
  }

}
