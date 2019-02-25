import {
  AssinarContratoFactory,
} from '../../../factory/components/contrato/AssinarContratoFactory';

describe('Componente de Assinar Contrato', () => {
  const factory = new AssinarContratoFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('Ao assinar contrato com sucesso, redireciona para Resumo', async (done) => {
    factory.dadoQueOContratoSejaAssinadoComSucesso();

    await factory.montarComponente();
    factory.componente.find('#assinar-contrato').trigger('click');

    factory.redirecionamento = (rota: string) => {
      expect(rota).toEqual('/Resumo');
      done();
    };
  });

  it('Ao assinar contrato com sucesso, uma action para limpar a store do aluno é chamada', async (done) => {
    factory.dadoQueOContratoSejaAssinadoComSucesso();

    await factory.montarComponente();
    factory.componente.find('#assinar-contrato').trigger('click');

    expect(factory.limparInformacoesDoAluno).toBeCalled();
    done();
  });

  it('Quando o contrato não pode ser assinado, redireciona para Sistema Indisponível', async (done) => {
    factory.dadoQueOContratoNaoPodeSerAssinado();

    await factory.montarComponente();
    factory.componente.find('#assinar-contrato').trigger('click');

    factory.redirecionamento = (rota: string) => {
      expect(rota).toEqual('/erro/SistemaIndisponivel');
      done();
    };
  });

  it('Quando não foi possível assinar o contrato, redireciona para Sistema Indisponível', async (done) => {
    factory.dadoQueAcontecaErroAoAssinarOContrato();

    await factory.montarComponente();
    factory.componente.find('#assinar-contrato').trigger('click');

    factory.redirecionamento = (rota: string) => {
      expect(rota).toEqual('/erro/SistemaIndisponivel');
      done();
    };
  });

  it('Ao assinar contrato, o estado de loading deve ser verdadeiro', async (done) => {
    factory.dadoQueOContratoSejaAssinadoComSucesso();

    await factory.montarComponente();

    expect(factory.vueInstance.carregando).toBeFalsy();

    factory.componente.find('#assinar-contrato').trigger('click');

    expect(factory.vueInstance.carregando).toBeTruthy();

    factory.redirecionamento = (rota: string) => {
      expect(rota).toEqual('/Resumo');
      done();
    };
  });

  it('Snapshot', async (done) => {
    expect(factory.componente).toMatchSnapshot();
    done();
  });
});
