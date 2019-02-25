import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DadoUmAcessoLiberadoAAlteracao extends HttpService {
  private response: any;

  public get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this.response = {data: { statusEstaLiberadoParaAlteracao: true }};

    return new Promise((resolve) => resolve(this.response));
  }
}
