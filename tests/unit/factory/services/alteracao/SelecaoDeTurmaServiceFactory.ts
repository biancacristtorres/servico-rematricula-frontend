import { FactoryServiceBase } from '../../FactoryServiceBase';
import { SelecaoDeTurmaService } from '@/services/alteracao/SelecaoDeTurmaService';
import { SelecaoDeTurmaRequest } from '@/services/alteracao/request/SelecaoDeTurmaRequest';
import { TurmaRequest } from '@/services/alteracao/request/TurmaRequest';
import { TurmaComplementarRequest } from '@/services/alteracao/request/TurmaComplementarRequest';
import { HorarioSemanalRequest } from '@/services/alteracao/request/HorarioSemanalRequest';
import { DiaDaSemana } from '@/common/enum/DiaDaSemana';
import {
  DadoUmaSelecaoDeTurmaComSucesso,
} from '../../../doubles/stubs/alteracao/selecaoDeTurmas/DadoUmaSelecaoDeTurmaComSucesso';

export class SelecaoDeTurmaServiceFactory extends FactoryServiceBase<SelecaoDeTurmaService> {

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

  public dadoQueApiRetorneStatusDeSucesso(): void {
    this.apiStub = new DadoUmaSelecaoDeTurmaComSucesso();
  }

  public espionarAPI() {
    this.espiao = jest.spyOn(DadoUmaSelecaoDeTurmaComSucesso.prototype, 'sendData');
  }

  public get servico(): SelecaoDeTurmaService {
    return new SelecaoDeTurmaService(this.apiStub);
  }

}
