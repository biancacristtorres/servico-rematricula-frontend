import { AjudaFactory } from '../../factory/pages/AjudaFactory';

describe('Página Ajuda', () => {
  it('Snapshot', () => {
    const factory = new AjudaFactory();

    factory.montarPagina();

    expect(factory.paginaDeAjuda)
      .toMatchSnapshot();
  });
});
