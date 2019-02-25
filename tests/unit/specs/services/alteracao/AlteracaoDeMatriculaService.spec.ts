import { CancelamentoDeMatriculaService } from '@/services/alteracao/CancelamentoDeMatriculaService';
import { MatriculaDeTurmaService } from '@/services/alteracao/MatriculaDeTurmaService';
import { AlteracaoDeMatriculaService } from '@/services/alteracao/AlteracaoDeMatriculaService';
import { AlteracaoRequest } from '@/services/alteracao/request/AlteracaoRequest';
import { Turma } from '@/model/Turma';

describe('services > alteracao > serivço de alteracao de matricula', () => {
  const codigoDoAluno = 1;
  let espiaoDeCancelamento: jest.SpyInstance<any>;
  let espiaoDeMatricula: jest.SpyInstance<any>;

  beforeEach(() => {
    espiaoDeCancelamento = jest.spyOn(CancelamentoDeMatriculaService.prototype, 'processar');
    espiaoDeMatricula = jest.spyOn(MatriculaDeTurmaService.prototype, 'processar');
  });

  afterEach(() => {
    espiaoDeCancelamento.mockRestore();
    espiaoDeMatricula.mockRestore();
  });

  it('Quando é turma atual, o serviço de cancelamento é chamado', async (done) => {
    const turmaAtual = new Turma();
    turmaAtual.eTurmaAtual = true;
    const request = new AlteracaoRequest(turmaAtual, codigoDoAluno, 1, 'Calculo');

    const servico = new AlteracaoDeMatriculaService();
    servico.processar(request);

    expect(espiaoDeCancelamento).toBeCalled();
    expect(espiaoDeMatricula).not.toBeCalled();
    done();
  });

  it('Quando não é turma atual, o serviço de matrícula é chamado', async (done) => {
    const turma = new Turma();
    turma.eTurmaAtual = false;
    const request = new AlteracaoRequest(turma, codigoDoAluno, 1, 'Calculo');

    const servico = new AlteracaoDeMatriculaService();
    servico.processar(request);

    expect(espiaoDeMatricula).toBeCalled();
    expect(espiaoDeCancelamento).not.toBeCalled();
    done();
  });
});
