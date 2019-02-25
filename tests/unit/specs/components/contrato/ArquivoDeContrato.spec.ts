import {
  ArquivoDeContratoFactory,
} from '../../../factory/components/contrato/ArquivoDeContratoFactory';

describe('Componente de Arquivo de Contrato', () => {
  const factory = new ArquivoDeContratoFactory();

  beforeEach(() => {
    factory.prepararTeste();
    factory.dadoQueUmPDFDeTesteSejaBaixado();
    factory.espionarServicoParaBaixarPDF();
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Ao montar o componente, o serviço para baixar PDF é chamado', async (done) => {
    await factory.montarComponente();

    expect(factory.espiao).toBeCalled();
    expect(factory.vueInstance.pdf).toEqual('teste.pdf');
    done();
  });

  it('Ao terminar de baixar o PDF, um evento é emitido', async (done) => {
    await factory.montarComponente();

    const eventoFoiEmitido = factory.componente.emitted('download-pronto');
    expect(eventoFoiEmitido).toBeTruthy();
    done();
  });

  it('No desktop, o visualizador de PDF é exibido', async (done) => {
    factory.dadoQueEDesktop();

    await factory.montarComponente();

    expect(factory.visualizadorDePDF.exists()).toBeTruthy();
    expect(factory.baixarPDF.exists()).toBeFalsy();
    done();
  });

  it('No mobile, um botão para baixar o PDF é exibido', async (done) => {
    factory.dadoQueEMobile();

    await factory.montarComponente();

    expect(factory.visualizadorDePDF.exists()).toBeFalsy();
    expect(factory.baixarPDF.exists()).toBeTruthy();
    done();
  });

  it('No mobile, é permitido fazer download do PDF', async (done) => {
    factory.dadoQueEMobile();
    window.open = jest.fn();

    await factory.montarComponente();
    factory.baixarPDF.trigger('click');

    expect(window.open).toBeCalledWith('teste.pdf', '_blank');
    done();
  });

  it('Snapshot', async (done) => {
    await factory.montarComponente();
    done();
  });

});
