import { AlteracaoResponse } from '../response/AlteracaoResponse';
import { AlteracaoRequest } from '../request/AlteracaoRequest';

export interface IMatriculaService  {
  processar(request: AlteracaoRequest): Promise<AlteracaoResponse>;
}
