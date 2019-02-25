import {
  AssinarContratoServiceFactory,
} from '../../../factory/services/contrato/AssinarContratoServiceFactory';

describe('service > AssinarContratoService', () => {
  const factory = new AssinarContratoServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Assina um contrato com sucesso', async (done) => {
    factory.dadoOAluno(1774432);
    factory.dadoQueApiRespondaQueOContratoFoiAssinado();

    const contratoFoiAssinado = await factory.servico.processar(factory.codigoDoAluno);

    expect(contratoFoiAssinado).toBeTruthy();
    expect(factory.espiao).toHaveBeenCalledTimes(1);
    expect(factory.espiao)
      .toHaveBeenCalledWith(`/api/AssinarContrato?codigoAluno=${ factory.codigoDoAluno }`);

    done();
  });

});
