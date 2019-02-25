import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Inject } from 'typescript-ioc';

export abstract class ServiceBase {
  protected abstract urlBase: string;
  protected http!: HttpService;

  constructor(@Inject http: HttpService) {
    this.http = http;
  }
}
