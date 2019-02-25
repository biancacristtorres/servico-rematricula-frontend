import {
  RequestDeSelecaoDeTurmaService,
} from '@/services/alteracao/RequestDeSelecaoDeTurmaService';

export class RequestDeSelecaoDeTurmaServiceFactory {

  public get servico() {
    return new RequestDeSelecaoDeTurmaService();
  }

}
