import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DadoUmAcessoNegadoAAlteracao extends HttpService {
  private response: any;

  public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>  {
    this.response = {data: { statusEstaLiberadoParaAlteracao: false }};

    return new Promise((resolve) => resolve(this.response));
  }
}
