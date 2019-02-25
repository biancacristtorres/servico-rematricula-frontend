import { PaginasDeErroFactory } from '../../factory/pages/PaginasDeErroFactory';

describe('Páginas de erro', () => {
  const factory = new PaginasDeErroFactory();

  factory.montarPaginas();

  it('snapshot PaginaNaoEncontrada', () => {
    expect(factory.PaginaNaoEncontrada).toMatchSnapshot();
  });

  it('snapshot PendenciaAcademica', () => {
    expect(factory.PendenciaAcademica).toMatchSnapshot();
  });

  it('snapshot PendenciaFinanceira', () => {
    expect(factory.PendenciaFinanceira).toMatchSnapshot();
  });

  it('snapshot SistemaIndisponivel', () => {
    expect(factory.SistemaIndisponivel).toMatchSnapshot();
  });

  it('snapshot UsuarioNaoAutenticado', () => {
    expect(factory.UsuarioNaoAutenticado).toMatchSnapshot();
  });

  it('snapshot RematriculaNaoIniciada', () => {
    expect(factory.RematriculaNaoIniciada).toMatchSnapshot();
  });

  it('snapshot ErroDeSistema', () => {
    expect(factory.ErroDeSistema).toMatchSnapshot();
  });


});
