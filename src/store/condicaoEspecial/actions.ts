import { ActionTree } from 'vuex';
import { CondicaoEspecialState } from './state';
import { RootState } from '@/store';
import { MutationsTypes } from './mutations';
import { Container, AutoWired } from 'typescript-ioc';
import { CondicaoEspecialService } from '@/services/CondicaoEspecialService';
import { CondicaoEspecialRequest } from './request/CondicaoEspecialRequest';

export enum ActionTypes {
  PREENCHER_CONDICOES_ESPECIAIS_SOLICITADAS = 'PREENCHER_CONDICOES_ESPECIAIS_SOLICITADAS',
  SOLICITAR_CONDICOES_ESPECIAIS = 'SOLICITAR_CONDICOES_ESPECIAIS',
}

const actions: ActionTree<CondicaoEspecialState, RootState> = {

  async [ActionTypes.PREENCHER_CONDICOES_ESPECIAIS_SOLICITADAS]({ commit, getters }, codigoDoAluno: number) {
    const service = (Container.get(CondicaoEspecialService) as CondicaoEspecialService);
    const solicitadas = await service.solicitadasPor(codigoDoAluno);

    commit(MutationsTypes.SET_SOLICITADAS, solicitadas);
  },

  async [ActionTypes.SOLICITAR_CONDICOES_ESPECIAIS]({ commit }, request: CondicaoEspecialRequest) {
    const service = (Container.get(CondicaoEspecialService) as CondicaoEspecialService);
    await service.solicitar(request.codigoDoAluno, request.condicoesEspeciais);
  },

};

export default actions;
