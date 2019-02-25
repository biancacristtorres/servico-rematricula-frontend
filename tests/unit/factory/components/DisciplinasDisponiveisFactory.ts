import { FactoryComponentBase } from '../FactoryComponentBase';
import DisciplinasDisponiveis from '@/components/alteracao/DisciplinasDisponiveis.vue';
import { mount } from '@vue/test-utils';
import store from '@/store';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoDuasDisciplinasDisponiveis,
} from '../../doubles/stubs/alteracao/disciplinasDisponiveis/DadoDuasDisciplinasDisponiveis';
import {
  DadoQueNaoExistemDisciplinas,
} from '../../doubles/stubs/alteracao/disciplinasDisponiveis/DadoQueNaoExistemDisciplinas';

export class DisciplinasDisponiveisFactory extends FactoryComponentBase<DisciplinasDisponiveis> {

  public dadoQueApiRetorneDuasDisciplinasDisponiveis(): void {
    Container.bind(HttpService).to(DadoDuasDisciplinasDisponiveis);
  }

  public dadoQueApiNaoRetorneDisciplinasDisponiveis(): void {
    Container.bind(HttpService).to(DadoQueNaoExistemDisciplinas);
  }

  public criarWrapper(): void {
    this.componente = mount(DisciplinasDisponiveis, { store });
  }
}
