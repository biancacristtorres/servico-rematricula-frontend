import { ActionTree } from 'vuex';
import { ResumoState } from './state';
import { RootState } from '@/store';
import { ResumoMutationTypes } from './mutations';
import { Container } from 'typescript-ioc';
import { ResumoService } from '@/services/resumo/ResumoService';

export enum ResumoActionTypes {
  OBTER_RESUMO = 'OBTER_RESUMO',
  OBTER_NOME_DISCIPLINAS_SEM_HORARIO = 'OBTER_NOME_DISCIPLINAS_SEM_HORARIO',
  EXISTEM_DISCIPLINAS_PARA_EXIBIR = 'EXISTEM_DISCIPLINAS_PARA_EXIBIR',
  EXISTEM_DISCIPLINAS_NA_FILA_DE_ESPERA = 'EXISTEM_DISCIPLINAS_NA_FILA_DE_ESPERA',
}

const actions: ActionTree<ResumoState, RootState> = {

  async [ResumoActionTypes.OBTER_RESUMO]({ commit }, codigoDoAluno: number) {
    const service = (Container.get(ResumoService) as ResumoService);

    const disciplinas = await service.obterResumo(codigoDoAluno);

    commit(ResumoMutationTypes.SET_HORARIOS, disciplinas);
  },

  async [ResumoActionTypes.OBTER_NOME_DISCIPLINAS_SEM_HORARIO]({ commit }, codigoDoAluno: number) {
    const service = (Container.get(ResumoService) as ResumoService);

    const disciplinas = await service.obterDisciplinasSemHorario(codigoDoAluno);
    commit(ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO, disciplinas);
  },
};

export default actions;
