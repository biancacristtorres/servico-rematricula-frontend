import { SelecaoDeCondicaoEspecialFactory } from '../../../factory/components/SelecaoDeCondicaoEspecialFactory';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

describe('Componente de Seleção de Condição Especial', () => {
  const factory = new SelecaoDeCondicaoEspecialFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueApiRetorneTurmasEspeciais();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('Recupera as solicitações de condição especial feitas por uma pessoa', async (done) => {
    await factory.montarComponente();

    expect(factory.vueInstance.solicitadas).toHaveLength(1);

    done();
  });

  it('Recupera todas as condições especiais', async (done) => {
    await factory.montarComponente();

    const esperado = [
      CondicaoEspecial.TurmasEspecias,
      CondicaoEspecial.CampusDiferentes,
      CondicaoEspecial.TurnosDiferentes,
    ];
    expect(factory.vueInstance.condicoesEspeciais).toEqual(esperado);
    expect(factory.vueInstance.condicoesEspeciais).toHaveLength(3);

    done();
  });

  it('Solicitações feitas anteriormente estão selecionadas', async (done)  => {
    await factory.montarComponente();

    expect(factory.vueInstance.condicoesEspeciaisASolicitar).toContain(CondicaoEspecial.TurmasEspecias);
    expect(factory.vueInstance.condicoesEspeciaisASolicitar).toHaveLength(1);

    done();
  });
});
