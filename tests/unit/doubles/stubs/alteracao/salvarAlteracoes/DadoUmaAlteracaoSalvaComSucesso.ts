import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DadoUmaAlteracaoSalvaComSucesso extends HttpService {
  private response: any;

  public post(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this.response = { status: 200};

    return new Promise((resolve) => resolve(this.response));
  }

}
