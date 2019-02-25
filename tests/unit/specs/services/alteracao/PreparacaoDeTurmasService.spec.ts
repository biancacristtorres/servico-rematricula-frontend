import {
  PreparacaoDeTurmasServiceFactory,
} from '../../../factory/services/alteracao/PreparacaoDeTurmasServiceFactory';

describe('service > PreparacaoDeTurmasSerivce', () => {
  const factory = new PreparacaoDeTurmasServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
    factory.setarVariavelAmbiente('VUE_APP_API_COMPRAONLINE', '');

  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Solicita a preparação de turmas com sucesso', async (done) => {
    const codigoDoAluno = 154;
    factory.dadoQueApiRetorneStatusDeSucesso();

    await factory.servico.processar(codigoDoAluno);

    expect(factory.espiao).toBeCalledWith(`/api/Matricula/${ codigoDoAluno }/Carregamento`);
    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });

});
