import {
  DialogoDinamicoFactory,
} from '../../../factory/components/DialogoDinamicoFactory';
import { OpcoesDeDialogoDinamico } from '@/model/OpcoesDeDialogoDinamico';

describe('Componente de Diálogo Dinâmico', () => {
  const factory = new DialogoDinamicoFactory();
  let opcoes: OpcoesDeDialogoDinamico;

  beforeEach(() => {
    opcoes = new OpcoesDeDialogoDinamico();
    opcoes.componente = '../../tests/unit/doubles/dummies/ComponenteDinamicoDummy.vue';
  });

  it('Renderiza um diálogo com um componente dinâmico', async (done) => {
    factory.dadoAProp(opcoes);
    await factory.montarComponente();

    const componenteDummy = factory.componente.find('#componente-dinamico-dummy');
    expect(componenteDummy.exists()).toBeTruthy();
    done();
  });

  it('Emite um evento para confirmar', async (done) => {
    opcoes.textoConfirmar = 'OK';
    factory.dadoAProp(opcoes);

    await factory.montarComponente();
    factory.componente.find('#confirmar').trigger('click');

    expect(factory.oEventoConfirmarFoiEmitido).toBeTruthy();
    done();
  });

  it('Emite um evento para rejeitar', async (done) => {
    opcoes.textoCancelar = 'CANCELAR';
    factory.dadoAProp(opcoes);

    await factory.montarComponente();
    factory.componente.find('#cancelar').trigger('click');

    expect(factory.oEventoCancelarFoiEmitido).toBeTruthy();
    done();
  });

  it('Renderiza um botao de confirmação', async (done) => {
    opcoes.textoConfirmar = 'OK';
    factory.dadoAProp(opcoes);
    await factory.montarComponente();

    const botaoDeConfirmacao = factory.componente.find('#confirmar');
    expect(botaoDeConfirmacao.exists()).toBeTruthy();
    expect(botaoDeConfirmacao.text()).toEqual('OK');
    done();
  });

  it('Não renderiza um botao de confirmação', async (done) => {
    factory.dadoAProp(opcoes);
    await factory.montarComponente();

    const botaoDeConfirmacao = factory.componente.find('#confirmar');
    expect(botaoDeConfirmacao.exists()).toBeFalsy();
    done();
  });

  it('Renderiza um botao de cancelamento', async (done) => {
    opcoes.textoCancelar = 'CANCELAR';
    factory.dadoAProp(opcoes);
    await factory.montarComponente();

    const botaoDeConfirmacao = factory.componente.find('#cancelar');
    expect(botaoDeConfirmacao.exists()).toBeTruthy();
    expect(botaoDeConfirmacao.text()).toEqual('CANCELAR');
    done();
  });

  it('Não renderiza um botao de cancelamento', async (done) => {
    factory.dadoAProp(opcoes);
    await factory.montarComponente();

    const botaoDeConfirmacao = factory.componente.find('#cancelar');
    expect(botaoDeConfirmacao.exists()).toBeFalsy();
    done();
  });

  it('Snapshot', async (done) => {
    opcoes.titulo = 'titulo';
    opcoes.textoConfirmar = 'confirmar';
    opcoes.textoCancelar = 'cancelar';

    await factory.montarComponente();

    expect(factory.componente).toMatchSnapshot();
    done();
  });
});
