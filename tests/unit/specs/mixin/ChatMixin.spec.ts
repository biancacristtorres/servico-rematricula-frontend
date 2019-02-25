import { shallowMount } from '@vue/test-utils';
import ChatMixinDummy from '../../doubles/dummies/ChatMixinDummy.vue';
import store from '@/store';
import { FcWidgetMock } from '../../doubles/mock/FcWidgetMock';
import { ChatMixinDummyFactory } from '../../factory/components/ChatMixinDummyFactory';

describe('Componente de Arquivo de Contrato', () => {
  const factory = new ChatMixinDummyFactory();

  afterEach(() => {
    FcWidgetMock.destruirMock();
  });

  it('Não deve iniciar o chat caso o toggle esteja desativado', async (done) => {
    const fcWidget = FcWidgetMock.mock();
    factory.dadoQueOToggleDoChatEstaDesabilitado();
    factory.dadoQueEUmAlunoDaInstituicaoUnibh();

    await factory.montarComponente();

    expect(fcWidget.init).not.toHaveBeenCalled();
    done();
  });

  it('Deve iniciar o chat caso o fcWidget esteja carregado na window', async (done) => {
    const fcWidget = FcWidgetMock.mock();
    factory.dadoQueOToggleDoChatEstaHabilitado();
    factory.dadoQueEUmAlunoDaInstituicaoSaoJudas();

    await factory.montarComponente();

    expect(fcWidget.init).toHaveBeenCalled();
    done();
  });

  it('Não deve carregar as informacoes do aluno quando não estiverem carregadas na store', async (done) => {
    FcWidgetMock.mock();
    factory.dadoQueNaoExistemInformacoesDeAluno();

    await factory.montarComponente();
    expect((factory.componente.vm as any).informacoesUsuario).toBeNull();
    done();
  });

  it('Deve carregar as informacoes do aluno quando as informacoes estiverem carregadas na store', async (done) => {
    FcWidgetMock.mock();

    factory.dadoQueAsInformacoesEstaoCarregadasNaStore();

    await factory.montarComponente();

    expect((factory.componente.vm as any).informacoesUsuario).not.toBeNull();
    done();
  });

  it('Não deve iniciar o chat caso o fcWidget não esteja carregado na window', async (done) => {
    const wrapper = shallowMount(ChatMixinDummy, { store });
    const iniciarFreshChatMock = jest.fn();
    (wrapper.vm as any).iniciarFreshChat = iniciarFreshChatMock;

    expect(iniciarFreshChatMock).not.toBeCalled();
    done();
  });
});
