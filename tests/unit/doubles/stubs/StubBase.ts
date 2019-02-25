import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export abstract class StubBase extends HttpService {
  private response!: any;

  public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.response = {
      data: this.dadoUmResponse(),
    };

    return new Promise((resolve) => resolve(this.response));
  }

  protected abstract dadoUmResponse(): any;
}
