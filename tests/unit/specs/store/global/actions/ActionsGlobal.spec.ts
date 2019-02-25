import { GlobalActionTypes } from '@/store/actions';
import {
  ActionsGlobalFactory,
} from '../../../../factory/store/global/actions/ActionsGlobalFactory';

describe('store > global > actions', () => {
  const factory = new ActionsGlobalFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('A action global de limpar store, limpa o state de informações de aluno', async (done) => {
    factory.dadoQueAStorePossuaInformacoesDeAluno();
    factory.dadoQueAStorePossuaInformacoesDeResumo();

    factory.store.dispatch(GlobalActionTypes.LIMPAR_STORE);

    expect(factory.store.state.aluno.informacoesAluno).toBeUndefined();
    done();
  });

  it('A action global de limpar store, limpa o state de resumo', async (done) => {
    factory.dadoQueAStorePossuaInformacoesDeAluno();
    factory.dadoQueAStorePossuaInformacoesDeResumo();

    factory.store.dispatch(GlobalActionTypes.LIMPAR_STORE);

    expect(factory.store.state.resumo.horarios).toEqual([]);
    expect(factory.store.state.resumo.disciplinasSemHorario).toEqual([]);
    expect(factory.store.state.resumo.existemDisciplinas).toEqual(true);
    done();
  });

  it('Uma action global define o link para voltar de uma página', async (done) => {
    factory.store.dispatch(GlobalActionTypes.DEFINIR_LINK_PARA_VOLTAR, '/Resumo');

    expect(factory.store.state.linkParaVoltar).toEqual('/Resumo');
    done();
  });


  it('Uma action global limpa o link para voltar de uma página', async (done) => {
    factory.dadoQueAStorePossuaLinkParaVoltar();

    factory.store.dispatch(GlobalActionTypes.LIMPAR_LINK_PARA_VOLTAR);

    expect(factory.store.state.linkParaVoltar).toEqual('');
    done();
  });

});
