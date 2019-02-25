import { GetterTree } from 'vuex';
import { CondicaoEspecialState } from './state';
import { RootState } from '@/store';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

export enum GetterTypes {
  POSSUI_SOLICITADAS = 'POSSUI_SOLICITADAS',
  CONDICOES_ESPECIAIS = 'CONDICOES_ESPECIAIS',
}

const getters: GetterTree<CondicaoEspecialState, RootState> = {

  [GetterTypes.CONDICOES_ESPECIAIS](state) {
    return [
      CondicaoEspecial.TurmasEspecias,
      CondicaoEspecial.CampusDiferentes,
      CondicaoEspecial.TurnosDiferentes,
    ];
  },
};

export default getters;
