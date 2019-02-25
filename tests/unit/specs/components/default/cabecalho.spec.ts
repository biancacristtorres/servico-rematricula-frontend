
import { CabecalhoFactory } from '../../../factory/components/CabecalhoFactory';
import store, { StoreNamespaces } from '@/store';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';

describe('Componente de Cabeçalho', () => {
  const cabecalhoFactory = new CabecalhoFactory();

  afterEach(() => {
    cabecalhoFactory.destruirDialogo();
  });

  it('O título exibido deve ser o título passado por parâmetro', async (done) => {
    cabecalhoFactory.dadoOTitulo('XPTO');

    await cabecalhoFactory.montarComponente();

    expect(cabecalhoFactory.tituloDoCabecalho).toEqual('XPTO');
    done();
  });

  it('Quando houver link para voltar, então um botão de voltar deve ser exibido', async (done) => {
    await cabecalhoFactory.montarComponente();

    cabecalhoFactory.dadoOLinkParaVoltar('/Resumo');

    expect(cabecalhoFactory.linkDoBotaoVoltar).toEqual('/Resumo');
    expect(cabecalhoFactory.existeOBotaoVoltar).toBeTruthy();
    done();
  });

  it('Quando não houver link para voltar, então o botão de voltar não deve ser exibido ', async (done) => {
    cabecalhoFactory.dadoQueNaoExisteLinkParaVoltar();

    await cabecalhoFactory.montarComponente();

    expect(cabecalhoFactory.existeOBotaoVoltar).toBeFalsy();
    done();
  });

  it('Quando a rota for de erro de sistema, ajuda e protocolos e pessoa logada não são exibidos', async (done) => {
    cabecalhoFactory.dadoQueEstouNaTelaDeErroDeSistema();

    await cabecalhoFactory.montarComponente();

    const ajudaEProtocolos = cabecalhoFactory.componente.find('#ajuda-e-protocolos');
    const pessoaLogada = cabecalhoFactory.componente.find('#pessoa-logada');

    expect(ajudaEProtocolos.exists()).toBeFalsy();
    expect(pessoaLogada.exists()).toBeFalsy();
    done();
  });

  it('Quando existe alteração, um feedback é exibido ao voltar', async (done) => {
    store.dispatch(`${ StoreNamespaces.ALTERACAO }/${ AlteracaoActionTypes.INFORMAR_ALTERACAO }`);

    await cabecalhoFactory.montarComponente();
    cabecalhoFactory.dadoOLinkParaVoltar('/Resumo');
    cabecalhoFactory.componente.find('#link-para-voltar').trigger('click');

    expect(cabecalhoFactory.oDialogoEstaAberto()).toBeTruthy();
    done();
  });

  it('Quando não existe alteração, nenhum feedback é exibido ao voltar', async (done) => {
    store.dispatch(`${ StoreNamespaces.ALTERACAO }/${ AlteracaoActionTypes.LIMPAR_ALTERACAO }`);

    await cabecalhoFactory.montarComponente();
    cabecalhoFactory.dadoOLinkParaVoltar('/Resumo');
    cabecalhoFactory.componente.find('#link-para-voltar').trigger('click');

    expect(cabecalhoFactory.oDialogoEstaAberto()).toBeFalsy();
    done();
  });

  it('Snapshot', async (done) => {
    await cabecalhoFactory.montarComponente();

    expect(cabecalhoFactory.componente).toMatchSnapshot();
    done();
  });
});
