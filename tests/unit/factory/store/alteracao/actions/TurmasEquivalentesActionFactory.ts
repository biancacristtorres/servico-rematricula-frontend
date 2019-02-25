import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { FactoryStoreAlteracaoBase } from '../FactoryStoreAlteracaoBase';
import { Turma } from '@/model/Turma';
import {
  DadoDuasTurmasEquivalentes,
} from '../../../../doubles/stubs/alteracao/turmasEquivalentes/DadoDuasTurmasEquivalentes';

export class TurmasEquivalentesActionFactory extends FactoryStoreAlteracaoBase {

  public espionarApi(): void {
    this.espiao = jest.spyOn(DadoDuasTurmasEquivalentes.prototype, 'get');
  }

  protected stubarApi(): void {
    Container.bind(HttpService).to(DadoDuasTurmasEquivalentes);
  }

  public get turma48(): Turma {
    const turma48 = new Turma();
    turma48.codigo = 48;
    return turma48;
  }

  public get turma49(): Turma {
    const turma49 = new Turma();
    turma49.codigo = 49;
    return turma49;
  }
}
