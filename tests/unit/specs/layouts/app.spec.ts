import { AppFactory } from '../../factory/components/AppFactory';

describe('APP', () => {
  const factory = new AppFactory();

  it('O loading global é exibido', async (done) => {
    factory.dadoQueObterInformacoesEstaCarregando();

    await factory.montarComponente();

    const loadingGlobal = factory.componente.find('#loading-global');

    expect(loadingGlobal.exists()).toBeTruthy();
    done();
  });

  it('O loading global não é exibido', async (done) => {
    factory.dadoQueObterInformacoesNaoEstaCarregando();

    await factory.montarComponente();

    const loadingGlobal = factory.componente.find('#loading-global');

    expect(loadingGlobal.exists()).toBeFalsy();
    done();
  });

  it('Snapshot', async (done) => {
    await factory.montarComponente();

    expect(factory.componente).toMatchSnapshot();
    done();
  });
});
