import { AlertasDeAlteracaoRequest } from '../../../../../src/services/alteracao/request/AlertasDeAlteracaoRequest';
import { Periodicidade } from '@/common/enum/Periodicidade';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { Turma } from '@/model/Turma';
import { AlertasDeAlteracaoService } from '@/services/alteracao/AlertasDeAlteracaoService';

export class AlertasDeAlteracaoServiceFactory {

  public dadoUmRequestComAlunoAnualETurmaSemestral(): AlertasDeAlteracaoRequest {
    const turma = new Turma();
    turma.codigoPeriodicidade = Periodicidade.Semestral;

    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.codigoPeriodicidade = Periodicidade.Anual;
    informacoesAluno.codigoMarca = 3;

    return new AlertasDeAlteracaoRequest(turma, informacoesAluno);
  }

  public dadoUmRequestComAlunoSemestralTurmaSemestral(): AlertasDeAlteracaoRequest {
    const turma = new Turma();
    turma.codigoPeriodicidade = Periodicidade.Semestral;

    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.codigoPeriodicidade = Periodicidade.Semestral;
    informacoesAluno.codigoMarca = 3;

    return new AlertasDeAlteracaoRequest(turma, informacoesAluno);
  }

  public get servico(): AlertasDeAlteracaoService {
    return new AlertasDeAlteracaoService();
  }
}
