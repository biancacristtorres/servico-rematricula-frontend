import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils';
import Inicio from '@/pages/Inicio.vue';
import store from '@/store';
import { FeatureTogglePlugin } from 'componente-frontend-core/plugins/FeatureToggle';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { FeatureFlag } from 'componente-frontend-core/model/FeatureFlag';

export class InicioFactory {

  public rota: string = '';
  public paginaDeInicio!: Wrapper<Inicio>;
  public redirecionamento!: (rota: string) => any;
  private idDoBotaoContinuar: string = '#continuar';

  public montarPagina(featureFlagStubs?: FeatureFlag[]): void {
    const localVueSingle = createLocalVue();
    localVueSingle.config.silent = true;

    localVueSingle.use(FeatureTogglePlugin, store, featureFlagStubs);

    this.paginaDeInicio = shallowMount(Inicio,
      {
        localVue: localVueSingle,
        store,
        mocks: {
          $router: {
            push: (to: string) => {
              this.redirecionamento(to);
            },
          },
        },
      });
  }

  public dadoQueInteresseEstaHabilitado() {
    const interesseHabilitado = new FeatureFlag();
    interesseHabilitado.name = ToggleConstants.HabilitarInteresseDeDisciplinas;
    interesseHabilitado.status = true;

    this.montarPagina([interesseHabilitado]);
  }

  public dadoQueInteresseEstaDesabilitado() {
    const interesseDesabilitado = new FeatureFlag();
    interesseDesabilitado.name = ToggleConstants.HabilitarInteresseDeDisciplinas;
    interesseDesabilitado.status = false;

    this.montarPagina([interesseDesabilitado]);
  }

  public aoClicarEmContinuar(): void {
    this.paginaDeInicio.find(this.idDoBotaoContinuar).trigger('click');
  }
}
