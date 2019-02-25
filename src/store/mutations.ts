import { MutationTree } from 'vuex';
import { GlobalState } from './state';

export enum GlobalMutationTypes {
  SET_LINK_PARA_VOLTAR = 'SET_LINK_PARA_VOLTAR',
}

const mutations: MutationTree<GlobalState> = {

  [GlobalMutationTypes.SET_LINK_PARA_VOLTAR](state: GlobalState, linkParaVoltar: string) {
    state.linkParaVoltar = linkParaVoltar;
  },

};

export default mutations;
