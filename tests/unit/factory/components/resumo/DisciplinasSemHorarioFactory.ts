import DisciplinasSemHorario from '@/components/resumo/DisciplinasSemHorario.vue';
import { FactoryComponentBase } from '../../FactoryComponentBase';
import { mount } from '@vue/test-utils';
import store from '@/store';
import { FeatureFlag } from 'componente-frontend-core/model/FeatureFlag';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoUmaListaDeDisciplinasSemHorarioComDisciplinaEquivalente,
} from '../../../doubles/stubs/resumo/DadoUmaListaDeDisciplinasSemHorarioComDisciplinaEquivalente';

export class DisciplinasSemHorarioFactory extends FactoryComponentBase<DisciplinasSemHorario> {
  public featureFlagStubs?: FeatureFlag[];

  public criarWrapper(): void {
    this.componente = mount(DisciplinasSemHorario, { store });
  }

  public dadoQueAApiDeResumoRetorneDisciplinasSemHorarioComSucesso(): void {
    Container.bind(HttpService).to(DadoUmaListaDeDisciplinasSemHorarioComDisciplinaEquivalente);
  }

}
