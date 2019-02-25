import {
  TurmasGetterFactory,
} from '../../../../factory/store/alteracao/getters/TurmasGetterFactory';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { Turma } from '@/model/Turma';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { Filtro } from '@/model/Filtro';


describe('store > alteracao > getters', () => {
  const factory = new TurmasGetterFactory();

  beforeEach(() => {
    factory.injetarAPI();
    factory.dadoUmaStoreVazia();
  });

  afterEach(() => {
    factory.restaurarEstadoInicial();
  });

  describe('POSSUI_TURMAS', () => {

    it('Retorna falso quando não exitem turmas e turmas equivalentes', async (done) => {
      factory.dadoOStateComCalculoI();

      const atual = factory.store.getters[
        AlteracaoGetterTypes.POSSUI_TURMAS](factory.codigoCalculoI);

      expect(atual).toBeFalsy();
      done();
    });

    it('Retorna true quando existe pelo menos uma turma', async (done) => {
      factory.dadoOStateComCalculoIComTurmas();

      const atual = await factory.store.getters[
        AlteracaoGetterTypes.POSSUI_TURMAS](factory.codigoCalculoI);

      expect(atual).toBeTruthy();
      done();
    });
  });

  describe('TURMA_ATUAL', () => {
    it('Retorna undefined quando não há turma atual', async (done) => {
      factory.dadoOStateComCalculoI();

      const atual = factory.store.getters[
        AlteracaoGetterTypes.TURMA_ATUAL](factory.codigoCalculoI);

      expect(atual).toBeUndefined();
      done();
    });

    it('Retorna a turma atual quando existe turma atual em pelo menos um tipo de turma', async (done) => {
      factory.dadoOStateComCalculoIComTurmas();

      const atual: Turma = factory.store.getters[
        AlteracaoGetterTypes.TURMA_ATUAL](factory.codigoCalculoI);

      expect(atual.codigo).toEqual(1);
      done();
    });
  });

  describe('FILTRAR_TURMAS', () => {
    let turma1: Turma;
    let turma2: Turma;
    let turma3: Turma;

    beforeEach(() => {
      turma1 = new Turma();
      turma1.codigo = 1;
      turma1.eDoTurnoDoAluno = true;

      turma2 = new Turma();
      turma2.codigo = 2;
      turma2.eDoTurnoDoAluno = true;

      turma3 = new Turma();
      turma3.codigo = 3;
      turma3.eDoTurnoDoAluno = false;

      factory.dadoCalculoIComTurmas(turma1, turma2, turma3);
    });

    it('Quando exibir turnos diferentes for falso, deve retornar somente as turmas do turno do aluno', async (done) => {
      const filtro = new Filtro();
      filtro.exibirTurnosDiferentes = false;
      factory.filtrarPor(filtro);

      const atual = factory.store.getters[AlteracaoGetterTypes.TURMAS_FILTRADAS] (factory.codigoCalculoI);

      const esperado = [ turma1, turma2 ];
      expect(atual).toEqual(esperado);
      done();
    });

    it('Quando exibir turnos diferentes for verdadeiro, deve retornar todas as turmas do aluno', async (done) => {
      const filtro = new Filtro();
      filtro.exibirTurnosDiferentes = true;
      factory.filtrarPor(filtro);

      const atual = factory.store.getters[AlteracaoGetterTypes.TURMAS_FILTRADAS] (factory.codigoCalculoI);

      const esperado = [ turma1, turma2, turma3 ];
      expect(atual).toEqual(esperado);
      done();
    });
  });

  describe('FILTRAR_TURMAS_EQUIVALENTES', () => {
    let turma1: Turma;
    let turma2: Turma;
    let turma3: Turma;

    beforeEach(() => {
      turma1 = new Turma();
      turma1.codigo = 4;
      turma1.eDoTurnoDoAluno = true;

      turma2 = new Turma();
      turma2.codigo = 5;
      turma2.eDoTurnoDoAluno = true;

      turma3 = new Turma();
      turma3.codigo = 6;
      turma3.eDoTurnoDoAluno = false;

      factory.dadoCalculoIComTurmasEquivalentes(turma1, turma2, turma3);
    });

    it('Quando exibir turnos diferentes for falso, deve retornar somente as \
        turmas equivalentes do turno do aluno', async (done) => {
      const filtro = new Filtro();
      filtro.exibirTurnosDiferentes = false;
      factory.filtrarPor(filtro);

      const atual = factory.store.getters[
        AlteracaoGetterTypes.TURMAS_EQUIVALENTES_FILTRADAS] (factory.codigoCalculoI);

      const esperado = [ turma1, turma2 ];
      expect(atual).toEqual(esperado);
      done();
    });

    it('Quando exibir turnos diferentes for verdadeiro, deve retornar todas as \
        turmas equivalentes do aluno', async (done) => {
      const filtro = new Filtro();
      filtro.exibirTurnosDiferentes = true;
      factory.filtrarPor(filtro);

      const atual = factory.store.getters[
        AlteracaoGetterTypes.TURMAS_EQUIVALENTES_FILTRADAS] (factory.codigoCalculoI);

      const esperado = [ turma1, turma2, turma3 ];
      expect(atual).toEqual(esperado);
      done();
    });

  });

  describe('FITLRAR_TURMAS_ESPECIAIS', () => {
    let turma1: Turma;
    let turma2: Turma;
    let turma3: Turma;

    beforeEach(() => {
      turma1 = new Turma();
      turma1.codigo = 7;
      turma1.eDoTurnoDoAluno = true;

      turma2 = new Turma();
      turma2.codigo = 8;
      turma2.eDoTurnoDoAluno = true;

      turma3 = new Turma();
      turma3.codigo = 9;
      turma3.eDoTurnoDoAluno = false;

      factory.dadoCalculoIComTurmasEspeciais(turma1, turma2, turma3);
    });

    it('Quando exibir turnos diferentes for falso, deve retornar somente as \
        turmas especiais do turno do aluno', async (done) => {
      const filtro = new Filtro();
      filtro.exibirTurnosDiferentes = false;
      factory.filtrarPor(filtro);

      const atual = factory.store.getters[
        AlteracaoGetterTypes.TURMAS_ESPECIAIS_FILTRADAS ] (factory.codigoCalculoI);

      const esperado = [ turma1, turma2 ];
      expect(atual).toEqual(esperado);
      done();
    });

    it('Quando exibir turnos diferentes for verdadeiro, deve retornar todas as \
        turmas especiais do aluno', async (done) => {
      const filtro = new Filtro();
      filtro.exibirTurnosDiferentes = true;
      factory.filtrarPor(filtro);

      const atual = factory.store.getters[
        AlteracaoGetterTypes.TURMAS_ESPECIAIS_FILTRADAS] (factory.codigoCalculoI);

      const esperado = [turma1, turma2, turma3];
      expect(atual).toEqual(esperado);
      done();
    });
  });

});
