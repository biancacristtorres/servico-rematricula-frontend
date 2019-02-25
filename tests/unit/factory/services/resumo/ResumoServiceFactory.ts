import { ResumoService } from '@/services/resumo/ResumoService';
import { FactoryServiceBase } from '../../FactoryServiceBase';
import { DoisHorarios } from '../../../doubles/stubs/resumo/DoisHorarios';
import { DuasDisciplinasSemHorario } from '../../../doubles/stubs/resumo/DuasDisciplinasSemHorario';

export class ResumoServiceFactory extends FactoryServiceBase<ResumoService> {

  public dadoUmApiResponseComDoisHorarios(): void {
    this.apiStub = new DoisHorarios();
  }

  public dadoUmApiResponseComDuasDisciplinasSemHorario(): void {
    this.apiStub = new DuasDisciplinasSemHorario();
  }

  public get servico(): ResumoService {
    return new ResumoService(this.apiStub);
  }
}
