import { ResumoFactory } from '../../factory/pages/ResumoFactory';

describe('Página de Resumo', () => {
  const factory = new ResumoFactory();

  it('snapshot', () => {
    factory.montarPagina();

    expect(factory.paginaDeResumo)
      .toMatchSnapshot();
  });

});
