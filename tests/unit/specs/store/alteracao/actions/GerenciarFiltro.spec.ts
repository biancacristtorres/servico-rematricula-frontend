import { Filtro } from '@/model/Filtro';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import {
  GerenciarFiltroFactory,
} from '../../../../factory/store/alteracao/actions/GerenciarFiltroFactory';

describe('store > alteracao > actions > Actions para gerenciar o state de filtro', () => {
  const factory = new GerenciarFiltroFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('A store de alteração é capaz de setar um novo estado de filtro', async (done) => {
    const novoFiltro = new Filtro();
    novoFiltro.exibirTurnosDiferentes = true;

    factory.store.dispatch(AlteracaoActionTypes.ALTERAR_FILTRO, novoFiltro);

    const atual = factory.store.getters[AlteracaoGetterTypes.FILTRO];
    expect(atual).toEqual(novoFiltro);
    done();
  });

});
