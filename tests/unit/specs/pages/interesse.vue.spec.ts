import { InteresseFactory } from '../../factory/pages/InteresseFactory';

describe('Página de Interesse', () => {
  const factory = new InteresseFactory();

  it('snapshot', () => {
    factory.montarPagina();

    expect(factory.paginaDeInteresse)
      .toMatchSnapshot();
  });

});
