import { FactoryStoreAlteracaoBase } from '../FactoryStoreAlteracaoBase';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoDuasDisciplinasDisponiveis,
} from '../../../../doubles/stubs/alteracao/disciplinasDisponiveis/DadoDuasDisciplinasDisponiveis';

export class DisciplinasGetterFactory extends FactoryStoreAlteracaoBase {

  protected stubarApi(): void {
    Container.bind(HttpService).to(DadoDuasDisciplinasDisponiveis);
  }

}
