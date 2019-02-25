import {
  BaixarContratoServiceFactory,
} from '../../../factory/services/contrato/BaixarContratoServiceFactory';

describe('service > BaixarContratoService', () => {
  const factory = new BaixarContratoServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
    factory.mockarCriarBlob();
    factory.mockarCreateObjectUrl();
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Obtém um arquivo PDF com sucesso', async (done) => {
    factory.dadoQueApiRetorneUmPDF();

    await factory.servico.processar(factory.codigoDoAluno);

    expect(factory.servico.criarBlob).toBeCalled();
    expect(factory.createObjectURL).toBeCalled();
    expect(factory.espiao).toBeCalledWith(
      `/api/ObterArquivoContrato?codigoAluno=${ factory.codigoDoAluno }`, {
      responseType: 'arraybuffer',
      timeout: 120000,
    });

    done();
  });

});
