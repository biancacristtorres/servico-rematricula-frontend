import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DisciplinasPendentesApiSpy extends HttpService {
  public urlSolicitada!: string;
  public informacoesPostadas!: any;

  private response!: any;

  public dadoUmResponse(disciplinas: DisciplinaComInteresse[]) {
    this.response = {
      data:
        {
          disciplinasPendentes: disciplinas,
        },
    };
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.urlSolicitada = url;
    return new Promise((resolve) => resolve(this.response));
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.urlSolicitada = url;
    this.informacoesPostadas = data;

    return new Promise((resolve) => resolve());
  }

}
