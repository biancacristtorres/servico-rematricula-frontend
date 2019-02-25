import { ActionTree } from 'vuex';
import { InteresseState } from './state';
import { RootState } from '@/store';
import { InteresseMutationTypes } from './mutations';
import { Container } from 'typescript-ioc';
import { InteresseService } from '@/services/InteresseService';
import { ManifestarInteresseRequest } from './request/ManifestarInteresseRequest';

export enum InteresseActionTypes {
  OBTER_DISCIPLINAS_PENDENTES = 'OBTER_DISCIPLINAS_PENDENTES',
  MANIFESTAR_INTERESSE = 'MANIFESTAR_INTERESSE',
}

const actions: ActionTree<InteresseState, RootState> = {

  async [InteresseActionTypes.OBTER_DISCIPLINAS_PENDENTES]({ commit, getters }, codigoDoAluno: number) {
    const interesseService = (Container.get(InteresseService) as InteresseService);

    const disciplinas = await interesseService.obterDisciplinasPendentes(codigoDoAluno);

    commit(InteresseMutationTypes.SET_DISCIPLINAS, disciplinas);
  },

  async [InteresseActionTypes.MANIFESTAR_INTERESSE]({ commit }, request: ManifestarInteresseRequest) {
    const interesseService = (Container.get(InteresseService) as InteresseService);

    await interesseService.manifestarInteresse(request.codigoDoAluno, request.disciplinas);
  },

};

export default actions;
