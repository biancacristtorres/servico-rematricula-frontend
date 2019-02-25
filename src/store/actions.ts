import { ActionTree } from 'vuex';
import { RootState } from '.';
import { AlunoMutationTypes } from './aluno/mutations';
import { StoreNamespaces } from './namespaces';
import { ResumoMutationTypes } from './resumo/mutations';
import { GlobalMutationTypes } from './mutations';
import { GlobalState } from './state';

export enum GlobalActionTypes {
  LIMPAR_STORE = 'LIMPAR_STORE',
  DEFINIR_LINK_PARA_VOLTAR = 'DEFINIR_LINK_PARA_VOLTAR',
  LIMPAR_LINK_PARA_VOLTAR = 'LIMPAR_LINK_PARA_VOLTAR',
}

const actions: ActionTree<GlobalState, RootState> = {

  async [GlobalActionTypes.LIMPAR_STORE]({ commit }) {
    commit(`${ StoreNamespaces.ALUNO }/${ AlunoMutationTypes.LIMPAR_STORE }`);
    commit(`${ StoreNamespaces.RESUMO }/${ ResumoMutationTypes.LIMPAR_STORE }`);
  },

  async [GlobalActionTypes.DEFINIR_LINK_PARA_VOLTAR]({ commit }, link: string) {
    commit(GlobalMutationTypes.SET_LINK_PARA_VOLTAR, link);
  },

  async [GlobalActionTypes.LIMPAR_LINK_PARA_VOLTAR]({ commit }) {
    commit(GlobalMutationTypes.SET_LINK_PARA_VOLTAR, '');
  },
};

export default actions;
