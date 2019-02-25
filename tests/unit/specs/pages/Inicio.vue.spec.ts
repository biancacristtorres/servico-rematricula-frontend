import { InicioFactory } from '../../factory/pages/InicioFactory';

describe('Página Inicial', () => {

  it('Quando o interesse está desabilitado, redireciona para aguardando rematrícula', async (done) => {
    const factory = new InicioFactory();

    factory.dadoQueInteresseEstaDesabilitado();
    factory.aoClicarEmContinuar();

    factory.redirecionamento = (rota: string) => {
      expect(rota).toEqual('/AguardandoRematricula');
      done();
    };
  });

  it('Quando o interesse está habilitado, redireciona para interesse', async (done) => {
    const factory = new InicioFactory();

    factory.dadoQueInteresseEstaHabilitado();
    factory.aoClicarEmContinuar();

    factory.redirecionamento = (rota: string) => {
      expect(rota).toEqual('/Interesse');
      done();
    };
  });


  it('Snapshot', () => {
    const factory = new InicioFactory();

    factory.montarPagina();

    expect(factory.paginaDeInicio)
      .toMatchSnapshot();
  });
});
