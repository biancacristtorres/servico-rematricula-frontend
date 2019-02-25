import {
  ObterAcessoAoFreshDeskServiceFactory,
} from '../../factory/services/ObterAcessoAoFreshDeskServiceFactory';

describe('service > ObterAcessoAoFreshDeskService', () => {
  const factory = new ObterAcessoAoFreshDeskServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Obtem acesso ao FreshDesk com sucesso', async (done) => {
    factory.dadoOAluno(123);
    factory.dadoQueApiRespondaComSucesso();

    const url = await factory.servico.processar(factory.codigoDoAluno);

    expect(url).not.toBeNull();
    expect(factory.espiao).toHaveBeenCalledTimes(1);
    expect(factory.espiao)
      .toHaveBeenCalledWith(`/api/ObterAcessoAoFreshDesk?codigoAluno=${ factory.codigoDoAluno }`);

    done();
  });

});
