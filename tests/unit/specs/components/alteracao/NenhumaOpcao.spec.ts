import _ from 'lodash';
import {
   NenhumaOpcaoFactory,
} from '../../../factory/components/alteracao/NenhumaOpcaoFactory';

describe('Componente de Nenhuma Opção', () => {
  const factory = new NenhumaOpcaoFactory();

  it('O componente é exibido quando possui turma', async (done) => {
    factory.dadoADisciplina(1);
    factory.dadoQueADisciplinaPossuaTurmas();

    await factory.montarComponente();

    expect(factory.radioDeNenhumaOpcao.exists()).toBeTruthy();
    done();
  });

  it('O componente não é exibido quando não possui turmas', async (done) => {
    factory.dadoADisciplina(2);
    factory.dadoQueADisciplinaNaoPossuaTurmas();

    await factory.montarComponente();

    expect(factory.radioDeNenhumaOpcao.exists()).toBeFalsy();
    done();
  });

  it('Quando possui turma atual, o radio de nenhuma opção não está checkada', async (done) => {
    factory.dadoADisciplina(3);
    factory.dadoQueADisciplinaTenhaUmaTurmaAtual();

    await factory.montarComponente();

    expect(factory.radioDeNenhumaOpcaoEstaCheckado).toBeFalsy();
    expect(factory.vueInstance.iconeDoRadio).toEqual('radio_button_unchecked');

    done();
  });

  it('Quando não possui turma atual, o radio de nenhuma opção está checkada', async (done) => {
    factory.dadoADisciplina(4);
    factory.dadoQueADisciplinaNaoTenhaUmaTurmaAtual();

    await factory.montarComponente();

    expect(factory.radioDeNenhumaOpcaoEstaCheckado).toBeTruthy();
    expect(factory.vueInstance.iconeDoRadio).toEqual('radio_button_checked');

    done();
  });

  it('Ao selecionar o radio de nenhuma opção um evento é emtido', async (done) => {
    factory.dadoADisciplina(5);
    factory.dadoQueADisciplinaPossuaTurmas();

    await factory.montarComponente();
    factory.radioDeNenhumaOpcao.trigger('click');

    const atual = _.first(factory.componente.emitted('remover-turma'));
    const esperado = factory.codigoDaDisciplina;

    expect(atual).toContainEqual(esperado);

    done();
  });

  it('Quando aplicação está carregando, um loading é exibdo', async (done) => {
    factory.dadoADisciplina(1);
    factory.dadoQueADisciplinaPossuaTurmas();
    factory.dadoQueExisteUmaSelecaoEmProcessamento();

    await factory.montarComponente();

    expect(factory.loading.exists()).toBeTruthy();
    expect(factory.radioDeNenhumaOpcao.exists()).toBeFalsy();

    done();
  });

  it('Quando aplicação não está carregando, um loading não é exibdo', async (done) => {
    factory.dadoADisciplina(1);
    factory.dadoQueADisciplinaPossuaTurmas();
    factory.dadoQueNaoExisteUmaSelecaoEmProcessamento();

    await factory.montarComponente();

    expect(factory.loading.exists()).toBeFalsy();
    expect(factory.radioDeNenhumaOpcao.exists()).toBeTruthy();

    done();
  });

});
