import { CondicaoEspecialFactory } from '../../factory/store/CondicaoEspecialFactory';
import { ActionTypes } from '@/store/condicaoEspecial/actions';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';
import { GetterTypes } from '@/store/condicaoEspecial/getters';
import { CondicaoEspecialRequest } from '@/store/condicaoEspecial/request/CondicaoEspecialRequest';

describe('store > CondicaoEspecialStore', () => {
  const factory = new CondicaoEspecialFactory();
  let envInicial: any;

  describe('Actions', () => {

    beforeEach(() => {
      envInicial = process.env.VUE_APP_API_INTERESSE;
      process.env.VUE_APP_API_INTERESSE = '';
      factory.injetarAPI();
      factory.dadoUmaStoreVazia();
      factory.espionarGetDaApi();
    });

    afterEach(() => {
      process.env.VUE_APP_API_INTERESSE = envInicial;
      factory.restaurarEstadoInicial();
    });

    it('A action preenche as condições especiais através de uma API', async (done) => {
      await factory.store
        .dispatch(ActionTypes.PREENCHER_CONDICOES_ESPECIAIS_SOLICITADAS, factory.umAlunoQualquer);

      expect(factory.espiao).toHaveBeenCalledTimes(1);
      expect(factory.store.state.solicitadas).toContainEqual(CondicaoEspecial.TurmasEspecias);
      done();
    });

    it('Posta as condicoes especiais', async (done) => {
      factory.espionarPostDaApi();

      const request = new CondicaoEspecialRequest(factory.umAlunoQualquer, [
        CondicaoEspecial.TurmasEspecias,
        CondicaoEspecial.TurnosDiferentes,
      ]);

      await factory.store
        .dispatch(ActionTypes.SOLICITAR_CONDICOES_ESPECIAIS, request);

      expect(factory.espiao).toBeCalledWith('/api/condicoesEspeciais', {
        codigoDoAluno: factory.umAlunoQualquer,
        condicoesEspeciais: [
          CondicaoEspecial.TurmasEspecias,
          CondicaoEspecial.TurnosDiferentes,
        ],
      });

      done();
    });

  });

  describe('Getters', () => {

    beforeEach(() => {
      factory.injetarAPI();
      factory.dadoUmaStoreVazia();
    });

    afterEach(() => {
      factory.restaurarEstadoInicial();
    });

    it('Todas as condições especiais', () => {
      const atual = factory.store.getters[GetterTypes.CONDICOES_ESPECIAIS];

      const esperado = [
        CondicaoEspecial.TurmasEspecias,
        CondicaoEspecial.CampusDiferentes,
        CondicaoEspecial.TurnosDiferentes,
      ];

      expect(atual).toEqual(esperado);
    });
  });
});
