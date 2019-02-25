import { MarcaState } from './state';
import { GetterTree } from 'vuex';
import { RootState } from '..';
import { Instituicao } from '@/common/enum/Instituicao';
import { Marca } from '@/model/Marca';

export enum MarcaGetterTypes {
  ENCONTRAR_MARCA_POR = 'DISCIPLINA',
  OBTER_LINK_DO_SOL = 'OBTER_LINK_DO_SOL',
  E_SAO_JUDAS = 'E_SAO_JUDAS',
  E_UNI_BH = 'E_UNI_BH',
}

const getters: GetterTree<MarcaState, RootState> = {

  [MarcaGetterTypes.ENCONTRAR_MARCA_POR](state) {
    return (instituicao: Instituicao) => {
      const marcaEncontrada: Marca | undefined = state.marcas.find(
        (m) => m.possuiInstituicao(instituicao),
      );

      if (marcaEncontrada) {
        return marcaEncontrada;
      } else {
        throw new Error(`Nenhuma marca foi encontrada para a Instituição ${instituicao}`);
      }
    };
  },

  [MarcaGetterTypes.OBTER_LINK_DO_SOL](state, currentGetters) {
    return (instituicao: Instituicao) => {
      const marca: Marca = currentGetters[MarcaGetterTypes.ENCONTRAR_MARCA_POR](instituicao);
      return `${marca.linkBaseDoSOL}SOL/aluno/index.php/index/seguranca/dev/instituicao/${instituicao}`;
    };
  },

  [MarcaGetterTypes.E_SAO_JUDAS](state, currentGetters) {
    return (instituicao: Instituicao) => {
      const marca: Marca = currentGetters[MarcaGetterTypes.ENCONTRAR_MARCA_POR](instituicao);
      const ehSaoJudas = marca.nome === 'USJT';
      return ehSaoJudas;
    };
  },

  [MarcaGetterTypes.E_UNI_BH](state, currentGetters) {
    return (instituicao: Instituicao) => {
      const marca: Marca = currentGetters[MarcaGetterTypes.ENCONTRAR_MARCA_POR](instituicao);
      const ehUniBH = marca.nome === 'UNIBH';
      return ehUniBH;
    };
  },
};

export default getters;
