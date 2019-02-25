import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';

export class InteresseService {
  private http!: HttpService;
  private urlBase!: string;

  constructor(@Inject http: HttpService) {
    this.http = http;
    this.urlBase = `${process.env.VUE_APP_API_INTERESSE}`;
  }

  public async obterDisciplinasPendentes(codigoDoAluno: number): Promise<DisciplinaComInteresse[]> {
    const url = `${this.urlBase}/api/disciplinasPendentes?codigoAluno=${codigoDoAluno}`;

    const response = await this.http.get(url);
    return response.data.disciplinasPendentes;

  }

  public async manifestarInteresse(codigoDoAluno: number, disciplinas: DisciplinaComInteresse[]): Promise<void> {
    const url = `${this.urlBase}/api/manifestarInteresse`;

    await this.http.post(url, { codigoDoAluno, disciplinas });
  }

}
