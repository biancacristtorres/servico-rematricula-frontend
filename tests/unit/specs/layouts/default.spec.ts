import { DefaultFactory } from '../../factory/layouts/DefaultFactory';

describe('layout > Página Default', () => {

  const factory = new DefaultFactory();

  it('Snapshot', async (done) => {
    await factory.montarComponente();

    expect(factory.componente).toMatchSnapshot();
    done();
  });

  it('Exibe um botão com o usuário impersonate', async (done) => {
    factory.dadoQueEImpersonate();
    factory.dadoQueAsInformacoesDoAlunoTenhaNomeSocial();

    await factory.montarComponente();

    const impersonate = factory.componente.find('#impersonate');
    expect(impersonate.exists()).toBeTruthy();
    expect(factory.vueInstance.textoDoBotaoDeImpersonate()).toEqual('Você está logado como Maria');

    done();
  });

  it('Não exibe botão de impersonate', async (done) => {
    factory.dadoQueNaoEImpersonate();

    await factory.montarComponente();

    const impersonate = factory.componente.find('#impersonate');
    expect(impersonate.exists()).toBeFalsy();

    done();
  });
});
