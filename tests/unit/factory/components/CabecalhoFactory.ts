import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Cabecalho from '@/components/Cabecalho.vue';
import { FactoryComponentBase } from '../FactoryComponentBase';
import store from '@/store';
import { GlobalActionTypes } from '@/store/actions';
import { RotasSemValidacao } from '@/config/router/RotasSemValidacao';
import { DialogoPlugin } from '@/common/plugins/dialogo';

export class CabecalhoFactory extends FactoryComponentBase<Cabecalho> {
  public componenteDeCabecalho!: Wrapper<Cabecalho>;
  private titulo!: string;
  private linkParaVoltar!: string;

  private idDoTitulo: string = '#titulo-cabecalho';
  private idDoLinkParaVoltar: string = '#link-para-voltar';
  private fullPath: string = '';

  public dadoQueEstouNaTelaDeErroDeSistema(): void {
    this.fullPath = RotasSemValidacao.ErroDeSistema;
  }

  public dadoOTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  public dadoOLinkParaVoltar(linkParaVoltar: string): void {
    store.dispatch(GlobalActionTypes.DEFINIR_LINK_PARA_VOLTAR, linkParaVoltar);
  }

  public dadoQueNaoExisteLinkParaVoltar(): void {
    store.dispatch(GlobalActionTypes.LIMPAR_LINK_PARA_VOLTAR);
  }

  public get tituloDoCabecalho(): string {
    return this.componente.find(this.idDoTitulo).text();
  }

  public get existeOBotaoVoltar(): boolean {
    return this.componente.find(this.idDoLinkParaVoltar).exists();
  }

  public get linkDoBotaoVoltar(): string {
    return this.vueInstance.linkParaVoltar;
  }

  public criarWrapper(): void {
    const vueComPluginDeDialogo = createLocalVue();
    vueComPluginDeDialogo.use(DialogoPlugin);

    this.componente = shallowMount(Cabecalho, {
      store,
      localVue: vueComPluginDeDialogo,
      propsData: {
          titulo: this.titulo,
          linkParaVoltar: this.linkParaVoltar,
      },
      mocks: {
        $route: {
          fullPath: this.fullPath,
        },
        $router: {
          push: jest.fn(),
        },
      },
    });
  }

}
