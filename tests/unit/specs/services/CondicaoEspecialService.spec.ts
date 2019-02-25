import { CondicaoEspecialFactory } from '../../factory/services/CondicaoEspecialServiceFactory';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

describe('service > CondicaoEspecialService', () => {
  const factory = new CondicaoEspecialFactory();
  const turmasEspeciaisECampusDiferentes = factory.dadoTurmasEspeciaisECampusDiferentes();

  describe('Obtenção de dados', () => {
      let condicoesSolicitadas: CondicaoEspecial[];

      beforeAll(async (done) => {
        factory.stub.dadoUmResponseCom(turmasEspeciaisECampusDiferentes);
        condicoesSolicitadas = await factory.service.solicitadasPor(factory.umAlunoQualquer);
        done();
      });

      it('Retorna a devida quantidade de condições ', () => {
        expect(condicoesSolicitadas).toHaveLength(2);
      });

      it('Retorna as condições corretamente', () => {
        const esperado = [CondicaoEspecial.TurmasEspecias, CondicaoEspecial.CampusDiferentes];
        expect(condicoesSolicitadas).toEqual(esperado);
      });
  });

  describe('Postagem de dados', () => {
    let envInicial: any;
    let espiaoDeApi: any;

    beforeAll(async (done) => {
      envInicial = process.env.VUE_APP_API_INTERESSE;
      process.env.VUE_APP_API_INTERESSE = '';

      espiaoDeApi = factory.espiaoDeApi();

      await factory.service.solicitar(factory.umAlunoQualquer, turmasEspeciaisECampusDiferentes);
      done();
    });

    afterAll(() => {
      process.env.VUE_APP_API_INTERESSE = envInicial;
    });

    it('Faz o número correto de chamadas à API', () => {
      expect(espiaoDeApi).toHaveBeenCalledTimes(1);
    });

    it('Posta corretamente os dados enviados', async () => {
      const postEsperado = {
        codigoDoAluno: factory.umAlunoQualquer,
        condicoesEspeciais: [CondicaoEspecial.TurmasEspecias, CondicaoEspecial.CampusDiferentes],
      };

      expect(espiaoDeApi).toBeCalledWith('/api/condicoesEspeciais', postEsperado);
    });

  });
});

