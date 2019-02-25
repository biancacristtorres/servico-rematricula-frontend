import { FactoryServiceBase } from '../../FactoryServiceBase';
import { BaixarContratoService } from '@/services/contrato/BaixarContratoService';
import {
  DownloadDePDFComSucesso,
} from '../../../doubles/stubs/contrato/pdf/DownloadDePDFComSucesso';

export class BaixarContratoServiceFactory extends FactoryServiceBase<BaixarContratoService> {
  public codigoDoAluno: number = 1645;
  public criarBlob!: jest.SpyInstance<any>;
  public createObjectURL!: jest.Mock<any>;

  public dadoQueApiRetorneUmPDF(): void {
    this.apiStub = new DownloadDePDFComSucesso();
  }

  public espionarAPI(): void {
    this.espiao = jest.spyOn(DownloadDePDFComSucesso.prototype, 'get');
  }

  public mockarCriarBlob(): void {
    this.criarBlob = jest.spyOn(BaixarContratoService.prototype, 'criarBlob');
  }

  public mockarCreateObjectUrl(): void {
    this.createObjectURL = jest.fn();
    URL.createObjectURL = this.createObjectURL;
  }

  public get servico(): BaixarContratoService {
    return new BaixarContratoService(this.apiStub);
  }

}
