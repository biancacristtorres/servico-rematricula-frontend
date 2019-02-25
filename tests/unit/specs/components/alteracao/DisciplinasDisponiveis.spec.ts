import {
  DisciplinasDisponiveisFactory,
} from '../../../factory/components/DisciplinasDisponiveisFactory';

describe('Componente de disciplinas disponíveis', () => {
  const factory = new DisciplinasDisponiveisFactory();

  beforeEach(async (done) => {
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueApiRetorneDuasDisciplinasDisponiveis();

    await factory.montarComponente();

    done();
  });

  afterEach(() => {
      factory.restaurarContainerDeInjecaoDaApi();
    });

  it('Recupera as disciplinas disponíveis feitas por uma pessoa', () => {
    expect(factory.vueInstance.disciplinas).toHaveLength(2);
    const mensagemListaVazia = factory.componente.find('#mensagem');

    expect(mensagemListaVazia.exists()).toBeFalsy();
  });

  it('Renderiza mensagem de lista vazia', async (done) => {
    factory.dadoQueApiNaoRetorneDisciplinasDisponiveis();

    await factory.montarComponente();

    const mensagemListaVazia = factory.componente.find('#mensagem');
    expect(factory.vueInstance.disciplinas).toHaveLength(0);
    expect(mensagemListaVazia.exists()).toBeTruthy();

    done();
  });

  it('Renderiza corretamente as disciplinas disponíveis', () => {
    const quandiadeAtualDeDisciplinasRenderizadas = factory.componente
      .findAll('.disciplina-disponivel').length;

    const quantidadeEsperada = 2;
    expect(quandiadeAtualDeDisciplinasRenderizadas).toEqual(quantidadeEsperada);
  });

  describe('Lazy components', () => {

    it('Antes de clicar em uma disciplina, as suas turmas ainda não estão carregadas', () => {
      const turmasDaDisciplina1 = factory.componente.find('#turmas-disciplina-1');

      expect(turmasDaDisciplina1.exists()).toBeFalsy();
    });

    it.skip('Depois de clicar em uma disciplina, as suas turmas são carregadas', async (done) => {
      factory.componente.find('#disciplina-1').trigger('click');

      await factory.aguardarRenderizacao();

      const carregandoTurmas = factory.componente.find('#turmas-disciplina-1');

      expect(carregandoTurmas.exists()).toBeTruthy();
      done();
    });

  });

});
