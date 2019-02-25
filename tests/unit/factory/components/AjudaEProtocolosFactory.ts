import { shallowMount, Wrapper } from '@vue/test-utils';
import AjudaEProtocolos from '@/components/AjudaEProtocolos.vue';
import store from '@/store';

export class AjudaEProtocolosFactory {
  public componenteAjudaEProtocolos!: Wrapper<AjudaEProtocolos>;
  private url!: string;
  private idDaUrl!: string;

  constructor() {
    this.idDaUrl = '#url-fresh-desk';
  }

  public dadoAUrl(url: string): void {
    this.url = url;
  }

  public get existeOBotaoDeAjudaEProtocolos(): boolean {
    return this.componenteAjudaEProtocolos.find(this.idDaUrl).exists();
  }

  public montarComponente(): void {
    this.componenteAjudaEProtocolos = shallowMount(AjudaEProtocolos, {
      store,
      mocks: {
        $router: {
          currentRoute : {
            name : 'xpto',
          },
        },
      },
      propsData: {
        url: this.url,
      },
    });
  }
}
