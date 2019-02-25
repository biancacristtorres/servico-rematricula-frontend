import { FactoryComponentBase } from '../../FactoryComponentBase';
import { mount } from '@vue/test-utils';
import GradeDeHorario from '@/components/resumo/GradeDeHorario.vue';
import store, { StoreNamespaces } from '@/store';
import { HorarioModelBuilder } from '../../../builders/HorarioModelBuilder';
import { ResumoMutationTypes } from '@/store/resumo/mutations';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoUmResumoContendoDisciplinaComTurmaEspecial,
} from '../../../doubles/stubs/resumo/DadoUmResumoContendoDisciplinaComTurmaEspecial';

export class GradeDeHorarioFactory extends FactoryComponentBase<GradeDeHorario> {
  public criarWrapper(): void {
    this.componente = mount(GradeDeHorario, { store });
  }

  public dadoQueAApiDeResumoRetorneDisciplinaComTurmaEspecialComSucesso(): void {
    Container.bind(HttpService).to(DadoUmResumoContendoDisciplinaComTurmaEspecial);
  }

  public get getPossuiDisciplinaTurmaEspecial(): boolean {
    return this.componente.find('.icone-turma-especial').exists();
  }
}
