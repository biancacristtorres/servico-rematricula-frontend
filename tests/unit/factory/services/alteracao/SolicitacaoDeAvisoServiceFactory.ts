import { FactoryServiceBase } from '../../FactoryServiceBase';
import { SolicitacaoDeAvisoService } from '@/services/alteracao/SolicitacaoDeAvisoService';
import {
  DadoUmaSolicitacaoComSucesso,
} from '../../../doubles/stubs/alteracao/solicitacaoDeAviso/DadoUmaSolicitacaoComSucesso';
import { SelecaoDeTurmaRequest } from '@/services/alteracao/request/SelecaoDeTurmaRequest';
import { HorarioSemanalRequest } from '@/services/alteracao/request/HorarioSemanalRequest';
import { DiaDaSemana } from '@/common/enum/DiaDaSemana';
import { TurmaComplementarRequest } from '@/services/alteracao/request/TurmaComplementarRequest';
import { TurmaRequest } from '@/services/alteracao/request/TurmaRequest';

export class SolicitacaoDeAvisoServiceFactory extends FactoryServiceBase<SolicitacaoDeAvisoService> {
  public espionarApi(): void {
    this.espiao = jest.spyOn(DadoUmaSolicitacaoComSucesso.prototype, 'sendData');
  }

  public dadoQueOAvisoFoiSolicitadoComSucesso(): void {
    this.apiStub = new DadoUmaSolicitacaoComSucesso();
  }

  public dadoUmRequestDeSelecaoDeTurma(): SelecaoDeTurmaRequest {
    const horarioSemanalRequest = new HorarioSemanalRequest();
    horarioSemanalRequest.diaDaSemana = DiaDaSemana.Quarta;
    horarioSemanalRequest.horaInicio = new Date();
    horarioSemanalRequest.horaFim = new Date();

    const complementarRequest = new TurmaComplementarRequest();
    complementarRequest.codigo = 1;
    complementarRequest.horariosDeTurmaSemanal = [horarioSemanalRequest];

    const turmaRequest = new TurmaRequest();
    turmaRequest.codigo = 2;
    turmaRequest.complementares = [complementarRequest];
    turmaRequest.horariosDeTurmaSemanal = [horarioSemanalRequest];

    const request = new SelecaoDeTurmaRequest();
    request.codigoDaDisciplina = 1;
    request.turma = turmaRequest;

    return request;
  }

  public get servico(): SolicitacaoDeAvisoService {
    return new SolicitacaoDeAvisoService(this.apiStub);
  }

}
