import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DadoUmEnvioDeComprovanteComSucesso extends HttpService {
  private response: any;

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.response = { status: 200};

    return new Promise((resolve) => resolve(this.response));
  }

}
