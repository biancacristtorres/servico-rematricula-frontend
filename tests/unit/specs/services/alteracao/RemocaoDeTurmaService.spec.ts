import {
  RemocaoDeTurmaServiceFactory,
} from '../../../factory/services/alteracao/RemocaoDeTurmaServiceFactory';

describe('service > RemocaoDeTurmaService', () => {
  const factory = new RemocaoDeTurmaServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
    factory.setarVariavelAmbiente('VUE_APP_API_COMPRAONLINE', '');
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Remove uma turma da disicplina com sucesso', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucesso();
    const codigoDaDisciplina = 175466;
    const codigoDoAluno = 1;

    const response = await factory.servico.processar(codigoDaDisciplina, codigoDoAluno);

    expect(response.status).toEqual(200);
    expect(factory.espiao).toBeCalledWith(`/api/Matricula/${ codigoDoAluno }/Disciplina/${codigoDaDisciplina}`);
    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });
});
