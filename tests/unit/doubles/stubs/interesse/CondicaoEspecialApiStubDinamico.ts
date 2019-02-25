import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

export class CondicaoEspecialApiStubDinamico extends HttpService {
  private response!: any;

  public dadoUmResponseCom(response: CondicaoEspecial[]): void {
    this.response = {
      data: {
        condicoesEspeciais: response,
      },
    };
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return new Promise((resolve) => resolve(this.response));
  }

}
