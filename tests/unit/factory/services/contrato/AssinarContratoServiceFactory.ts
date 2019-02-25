import { FactoryServiceBase } from '../../FactoryServiceBase';
import { AssinarContratoService } from '@/services/contrato/AssinarContratoService';
import {
  AssinaturaDeContratoComSucesso,
} from '../../../doubles/stubs/contrato/assinarContrato/AssinaturaDeContratoComSucesso';

export class AssinarContratoServiceFactory extends FactoryServiceBase<AssinarContratoService> {
  public codigoDoAluno!: number;

  public dadoOAluno(codigoDoAluno: number): void {
    this.codigoDoAluno = codigoDoAluno;
  }

  public espionarAPI(): void {
    this.espiao = jest.spyOn(AssinaturaDeContratoComSucesso.prototype, 'patch');
  }

  public dadoQueApiRespondaQueOContratoFoiAssinado(): void {
    this.apiStub = new AssinaturaDeContratoComSucesso();
  }

  public get servico(): AssinarContratoService {
    return new AssinarContratoService(this.apiStub);
  }

}
