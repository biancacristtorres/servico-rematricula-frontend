import {
  DisciplinasDisponiveisFactory,
} from '../../../factory/components/DisciplinasDisponiveisFactory';

describe('Quando o componente não finalizou o carregamento', () => {
  const factory = new DisciplinasDisponiveisFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('O componente deve estar carregando', async (done) => {
    factory.criarWrapper();

    const barraDeProgresso = factory.componente.find('#barra-de-progresso');

    expect(barraDeProgresso.exists()).toBeTruthy();
    expect(factory.vueInstance.carregando).toBeTruthy();

    done();
  });

  it('O componente esta carregado', async (done) => {
    factory.dadoQueApiRetorneDuasDisciplinasDisponiveis();

    await factory.montarComponente();

    const barraDeProgresso = factory.componente.find('#barra-de-progresso');

    expect(barraDeProgresso.exists()).toBeFalsy();
    expect(factory.vueInstance.carregando).toBeFalsy();
    done();
  });

});
