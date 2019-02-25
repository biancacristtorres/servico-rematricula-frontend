import { SelecaoDeDisciplinasFactory } from '../../../factory/components/SelecaoDeDisciplinasFactory';

describe('Componente de Interesse', () => {
  const factory = new SelecaoDeDisciplinasFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueApiRetorneTresDisciplinas();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('snapshot', async (done) => {
    await factory.montarComponente();

    expect(factory.componente)
      .toMatchSnapshot();

    done();
  });
});
