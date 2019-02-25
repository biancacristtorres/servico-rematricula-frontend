import {
  DadoUmaPreparacaoDeTurmasComSucesso,
} from '../../doubles/stubs/alteracao/preparacaoDeTurmas/DadoUmaPreparacaoDeTurmasComSucesso';
import Alteracao from '@/pages/Alteracao.vue';
import store from '@/store';
import { shallowMount } from '@vue/test-utils';
import { FactoryComponentBase } from '../FactoryComponentBase';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { DisciplinaMiniGrade } from '@/model/DisciplinaMiniGrade';
import { DisciplinasPorDiaDeSemanaDaMiniGrade } from '@/model/DisciplinasPorDiaDeSemanaDaMiniGrade';
import { MiniGradeState } from '@/store/miniGrade/state';
import { FeatureFlag } from 'componente-frontend-core/model/FeatureFlag';
import { ToggleConstants } from '@/common/enum/ToggleConstants';

export class AlteracaoFactory extends FactoryComponentBase<Alteracao> {
  public preparandoTurmas: jest.Mock<any> = jest.fn();
  public preparacaoFinalizada: jest.Mock<any> = jest.fn();

  public espionarApi(): void {
    this.espiao = jest.spyOn(DadoUmaPreparacaoDeTurmasComSucesso.prototype, 'post');
  }

  public dadoQueApiRetorneStatusDeSucesso(): void {
    Container.bind(HttpService).to(DadoUmaPreparacaoDeTurmasComSucesso);
  }

  public dadoAToggleDeFiltroHabilitada(): void {
    const filtroHabilitado = new FeatureFlag();
    filtroHabilitado.name = ToggleConstants.HabilitarFiltroDeTurmas;
    filtroHabilitado.status = true;

    this.featureFlags = [ filtroHabilitado ];
  }

  public dadoAToggleDeFiltroDesabilitada(): void {
    const filtroDesabilitado = new FeatureFlag();
    filtroDesabilitado.name = ToggleConstants.HabilitarFiltroDeTurmas;
    filtroDesabilitado.status = false;

    this.featureFlags = [ filtroDesabilitado ];
  }

  public linkParaVoltar(): string {
    return store.state.linkParaVoltar;
  }

  public get horarioDaMiniGradeEsperado(): HorarioDaMiniGrade {
    const calculoI =  new DisciplinaMiniGrade();
    calculoI.codigoDisciplina = 143924;
    calculoI.nomeDisciplina = 'Cálculo I';

    const disciplinasPorDiaDeSemana = new DisciplinasPorDiaDeSemanaDaMiniGrade();
    disciplinasPorDiaDeSemana[2] = [ calculoI ];
    disciplinasPorDiaDeSemana[5] = [ calculoI ];

    const horario =  new HorarioDaMiniGrade();
    horario.horaInicio = '20:55h';
    horario.disciplinasPorDiaDeSemana = disciplinasPorDiaDeSemana;

    return horario;
  }

  public get stateDaMiniGrade(): MiniGradeState {
    return (store.state as any).miniGrade;
  }

  public criarWrapper(): void {
    this.componente = shallowMount(Alteracao, {
      localVue: this.vueComPluginDeFeatureToggle(),
      store,
      methods: {
        preparandoTurmas: this.preparandoTurmas,
        preparacaoFinalizada: this.preparacaoFinalizada,
      },
    });
  }

}
