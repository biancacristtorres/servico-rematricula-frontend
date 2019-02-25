import { FreshChat } from '@/common/utils/FreshChat';
import { FcWidgetMock } from '../../doubles/mock/FcWidgetMock';

describe('Componente de Arquivo de Contrato', () => {

  it('Deve iniciar o chat', async (done) => {
    const fcWidget = FcWidgetMock.mock();
    FreshChat.iniciar(true, null);

    expect(fcWidget.init).toBeCalled();
    done();
  });

  it('Deve enviar informacoes caso response nao seja valida e usuario esteja logado', async (done) => {
    const usuarioEstaLogado = true;
    const userResponseComStatusInvalido = { status : 401, data: { identifier : 123 }};

    const fcWidget = FcWidgetMock.mock();

    FreshChat.enviarInformacoesDoAluno(fcWidget, usuarioEstaLogado, null, userResponseComStatusInvalido);

    expect(fcWidget.user.setProperties).toBeCalled();
    done();
  });

  it('Deve enviar infomacoes caso response seja valida com usuario anônimo e usuario esteja logado', async (done) => {
    const usuarioEstaLogado = true;
    const userResponseComUsuarioAnonimo = { status : 200, data: {} };

    const fcWidget = FcWidgetMock.mock();

    FreshChat.enviarInformacoesDoAluno(fcWidget, usuarioEstaLogado, null, userResponseComUsuarioAnonimo);

    expect(fcWidget.user.setProperties).toBeCalled();
    done();
  });

  it('Não deve enviar infomacoes caso response seja valida com usuario logado valido', async (done) => {
    const usuarioEstaLogado = true;
    const responseComUsuarioValido = { status : 200, data: { identifier : 123 } };

    const fcWidget = FcWidgetMock.mock();

    FreshChat.enviarInformacoesDoAluno(fcWidget, usuarioEstaLogado, null, responseComUsuarioValido);

    expect(fcWidget.user.setProperties).not.toBeCalled();
    done();
  });

  it('Deve limpar usuario caso possua usuário e usuario não esteja logado', async (done) => {
    const usuarioEstaLogado = false;
    const responseComUsuarioValido = { status : 200, data: { identifier : 123 } };

    const fcWidget = FcWidgetMock.mock();

    FreshChat.enviarInformacoesDoAluno(fcWidget, usuarioEstaLogado, null, responseComUsuarioValido);

    expect(fcWidget.user.clear).toBeCalled();
    done();
  });


  it('Deve limpar usuario', async (done) => {
    const fcWidget = FcWidgetMock.mock();

    FreshChat.limparUsuario();

    expect(fcWidget.user.clear).toBeCalled();
    done();
  });
});

