import { FactoryServiceBase } from '../../FactoryServiceBase';
import { DisciplinaDisponivelService } from '@/services/alteracao/DisciplinaDisponivelService';
import {
  DadoDuasDisciplinasDisponiveis,
} from '../../../doubles/stubs/alteracao/disciplinasDisponiveis/DadoDuasDisciplinasDisponiveis';
import {
  DadoUmaDisciplinasDisponiveisComEquivalenciaDoisPorUm,
} from '../../../doubles/stubs/alteracao/disciplinasDisponiveis/DadoUmaDisciplinasDisponiveisComEquivalenciaDoisPorUm';

export class DisciplinaDisponivelServiceFactory extends FactoryServiceBase<DisciplinaDisponivelService> {

  public get servico(): DisciplinaDisponivelService {
    return  new DisciplinaDisponivelService(this.apiStub);
  }

  public dadoQueApiRetorneDuasDisciplinasDisponiveis(): void {
    this.apiStub = new DadoDuasDisciplinasDisponiveis();
  }

  public dadoQueApiRetorneUmaDisciplinaComEquivalenciaDoisPorUm(): void {
    this.apiStub = new DadoUmaDisciplinasDisponiveisComEquivalenciaDoisPorUm();
  }

}
