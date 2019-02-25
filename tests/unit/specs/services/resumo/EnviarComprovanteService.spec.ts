import { EnviarComprovanteServiceFactory } from '../../../factory/services/resumo/EnviarComprovanteServiceFactory';

describe('service > EnviarComprovanteService', () => {
  const factory = new EnviarComprovanteServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
    factory.setarVariavelAmbiente('VUE_APP_API_URL', '');

  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Solicitar Envio do Comprovante', async (done) => {
    const codigoDoAluno = 123;
    factory.dadoQueApiRetorneStatusDeSucesso();

    await factory.servico.processar(codigoDoAluno);

    const postEsperado = {
      codigoDoAluno,
    };

    expect(factory.espiao).toBeCalledWith(`/api/ComprovanteMatricula?codigoAluno=${codigoDoAluno}`, postEsperado);
    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });

});
