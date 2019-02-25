import {
  MarcaGetterFactory,
} from '../../../factory/store/marca/MarcaGetterFactory';
import { Instituicao } from '@/common/enum/Instituicao';
import { Marca } from '@/model/Marca';
import { MarcaGetterTypes } from '@/store/marca/getters';

describe('store > marca > getter', () => {
  const factory = new MarcaGetterFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Encontra uma marca a partir de uma instituição', async (done) => {
    const marca: Marca = factory.store
      .getters[MarcaGetterTypes.ENCONTRAR_MARCA_POR](Instituicao.BomDespacho);

    expect(marca.nome).toEqual('UNA');
    done();
  });

  it('Quando uma marca não é encontrada a partir de uma instituiçao, uma exceção é levantada', async (done) => {
    expect(() => {
      factory.store.getters[MarcaGetterTypes.ENCONTRAR_MARCA_POR]('1890');
    }).toThrowError('Nenhuma marca foi encontrada para a Instituição 1890');
    done();
  });

  it('Ao obter link do sol, as informações de instituição e marca são concatenadas', async (done) => {
    const atual: string = factory.store
      .getters[MarcaGetterTypes.OBTER_LINK_DO_SOL](Instituicao.Catalao);

    const esperado = `https://aluno.una.br/SOL/aluno/index.php/index/seguranca/dev/instituicao/${
      Instituicao.Catalao
      }`;
    expect(atual).toEqual(esperado);
    done();
  });

  it('Encontra marca São Judas com sucesso', async (done) => {
    const ehSaoJudas = factory.store.getters[MarcaGetterTypes.E_SAO_JUDAS](Instituicao.Unimonte);
    expect(ehSaoJudas).toBeTruthy();
    done();
  });

  it('Não ecncontra marca São Judas', async (done) => {
    const ehSaoJudas = factory.store.getters[MarcaGetterTypes.E_SAO_JUDAS](Instituicao.UniBhBeloHorizonte);
    expect(ehSaoJudas).toBeFalsy();
    done();
  });

});
