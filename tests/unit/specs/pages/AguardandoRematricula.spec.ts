import { AguardandoRematriculaFactory } from '../../factory/pages/AguardandoRematriculaFactory';


describe('Página de Aguardando Rematrícula', () => {
  const factory = new AguardandoRematriculaFactory();

  it('snapshot', () => {
    factory.montarPagina();

    expect(factory.paginaDeAguardandoRematricula)
      .toMatchSnapshot();
  });

});
