import _ from 'lodash';
import {
  MiniGradeDeHorarioFactory,
} from '../../../factory/components/alteracao/MiniGradeDeHorarioFactory';

describe('Componente de MiniGradeDeHorario', () => {
  const factory = new MiniGradeDeHorarioFactory();

  it('snapshot', async (done) => {
    factory.dadoQueExistamHorarios();

    await factory.montarComponente();

    expect(factory.componente)
      .toMatchSnapshot();

    done();
  });

  it('A mini grade está em estado de loading', async (done) => {
    factory.dadoQueEstaAcontecendoUmaAlteracaoDeTurma();

    await factory.montarComponente();
    const loading = factory.componente.find('#loading-mini-grade');

    expect(loading.exists()).toBeTruthy();
    done();
  });


  it('A mini grade não está em estado de loading', async (done) => {
    factory.dadoQueNaoEstaAcontecendoUmaAlteracaoDeTurma();

    await factory.montarComponente();
    const loading = factory.componente.find('#loading-mini-grade');

    expect(loading.exists()).toBeFalsy();
    done();
  });

});
