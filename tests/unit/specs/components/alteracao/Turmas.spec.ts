import _ from 'lodash';
import {
  TurmasFactory,
} from '../../../factory/components/alteracao/TurmasFactory';
import { Turma } from '@/model/Turma';
describe('Componente de Turmas', () => {
  const factory = new TurmasFactory();

  it('Renderiza as turmas', async (done) => {
    factory.dadoQueExistemDuasTurmas();
    factory.dadoQueONovoSelecionadorEstaDesabilitado();

    await factory.montarComponente();

    const atual = factory.componente.findAll('.horario-turma');
    expect(atual).toHaveLength(2);
    done();
  });

  it('Renderiza as turmas complementares', async (done) => {
    factory.dadoQueExistemDuasTurmasComplementares();
    factory.dadoQueONovoSelecionadorEstaDesabilitado();

    await factory.montarComponente();

    const atual = factory.componente.findAll('.horario-turma-complementar');
    expect(atual).toHaveLength(2);
    done();
  });

  it('A turma matriculada deve estar checkada', async (done) => {
    factory.dadoQueExistemDuasTurmas();
    factory.dadoQueONovoSelecionadorEstaDesabilitado();

    await factory.montarComponente();

    expect(factory.estaSelecionada(factory.turmaSelecionada)).toBeTruthy();
    expect(factory.estaSelecionada(factory.turmaNaoSelecionada)).toBeFalsy();
    done();
  });

  it('Ao selecionar uma turma um evento de seleção é disparado', async (done) => {
    factory.dadoQueExistemDuasTurmas();
    factory.dadoQueExistaUmAlunoNaStore();

    await factory.montarComponente();
    factory.selecionar(factory.turmaNaoSelecionada);

    const atual = _.first(factory.componente.emitted('alterar-turma'));
    expect(atual).toContainEqual(factory.requestEsperadoDaTurmaNaoSelecionada);
    done();
  });

  it('Quando uma turma é a turma atual, o ícone é de radio button selecionado', async (done) => {
    const turma = new Turma();
    turma.eTurmaAtual = true;

    await factory.montarComponente();
    const atual = factory.vueInstance.iconeDoRadio(turma);

    const esperado = 'radio_button_checked';
    expect(atual).toEqual(esperado);
    done();
  });

  it('Quando uma turma não é a turma atual, o ícone é de radio button não selecionado', async (done) => {
    const turma = new Turma();
    turma.eTurmaAtual = false;

    await factory.montarComponente();
    const atual = factory.vueInstance.iconeDoRadio(turma);

    const esperado = 'radio_button_unchecked';
    expect(atual).toEqual(esperado);
    done();
  });

  it('Quando aplicação está carregando, um loading é exibdo', async (done) => {
    factory.dadoQueExistemDuasTurmas();
    factory.dadoQueExisteUmaSelecaoEmProcessamento();

    await factory.montarComponente();

    expect(factory.loadings).toHaveLength(2);
    expect(factory.radios).toHaveLength(0);

    done();
  });

  it('Quando aplicação não está carregando, um loading não é exibdo', async (done) => {
    factory.dadoQueExistemDuasTurmas();
    factory.dadoQueNaoExisteUmaSelecaoEmProcessamento();

    await factory.montarComponente();

    expect(factory.loadings).toHaveLength(0);
    expect(factory.radios).toHaveLength(2);

    done();
  });

  it('Em uma turma semanal, os horários semanais são exibidos', async (done) => {
    factory.dadoQueExisteUmaTurmaSemanal();

    await factory.montarComponente();
    const turmasSemanais = factory.componente.find('.turmas-semanais');
    const turmasPorData = factory.componente.find('.turmas-por-data');

    expect(turmasSemanais.exists()).toBeTruthy();
    expect(turmasPorData.exists()).toBeFalsy();
    done();
  });

  it('Em uma turma por data, os horários por data são exibidos', async (done) => {
    factory.dadoQueExisteUmaTurmaPorData();

    await factory.montarComponente();
    const turmasPorData = factory.componente.find('.turmas-por-data');
    const turmasSemanais = factory.componente.find('.turmas-semanais');

    expect(turmasPorData.exists()).toBeTruthy();
    expect(turmasSemanais.exists()).toBeFalsy();
    done();
  });

  it('Ao clicar em uma turma por data, o diálogo dos horários são exibidos', async (done) => {
    factory.dadoQueExisteUmaTurmaPorData();
    factory.vueInstance.$dialogo.abrirDialogoDinamico = jest.fn();

    await factory.montarComponente();
    factory.componente.find('.turmas-por-data').trigger('click');

    expect(factory.vueInstance.$dialogo.abrirDialogoDinamico).toBeCalled();
    done();
  });

  it('Uma turma com vagas negativas que não pode solicitar aviso está em fila de espera', async (done) => {
    await factory.montarComponente();

    const atual = factory.vueInstance
      .textoDasVagas(factory.turmaComVagasNegativas, factory.turmaComVagasNegativas.vagas);

    const esperado = 'Fila de espera (3)';
    expect(atual).toEqual(esperado);
    done();
  });

  it('Uma turma prática sem vagas mostra informação de falta de vagas', async (done) => {
    await factory.montarComponente();

    const atual = factory.vueInstance
      .textoDasVagas(factory.turmaPraticaSemVagas, factory.turmaPraticaSemVagas.vagas);

    const esperado = 'Sem vagas';
    expect(atual).toEqual(esperado);
    done();
  });

  it('Exibe o botão de avise-me', async (done) => {
    factory.dadoQueExisteUmaTurmaPraticaSemVagas();

    await factory.montarComponente();

    const aviseMe = factory.componente.find('.avise-me');

    expect(aviseMe.exists()).toBeTruthy();
    done();
  });

  it('Não exibe o botão avise-me', async (done) => {
    factory.dadoQueExisteUmaTurmaPraticaComVagas();

    await factory.montarComponente();

    const aviseMe = factory.componente.find('.avise-me');

    expect(aviseMe.exists()).toBeFalsy();
    done();
  });

  it('Solicita aviso em uma turma prática sem vagas', async (done) => {
    factory.dadoQueExisteUmaTurmaPraticaSemVagas();

    await factory.montarComponente();
    factory.componente.find('.avise-me').trigger('click');

    expect(factory.solicitarAviso).toBeCalled();
    done();
  });

  it('Gera key com base em um padrão e um índice', async (done) => {
    const padrao = 'padrao';
    const indice = 1;

    const atual = factory.vueInstance.gerarKey(padrao, indice);
    const esperado = 'padrao-1';

    expect(atual).toEqual(esperado);

    done();
  });

});
