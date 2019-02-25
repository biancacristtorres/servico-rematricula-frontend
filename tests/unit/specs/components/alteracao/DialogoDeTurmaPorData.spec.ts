import {
  DialogoDeTurmaPorDataFactory,
} from '../../../factory/components/DialogoDeTurmaPorDataFactory';

describe('Componente de diálogo de turma por data', () => {
  const factory = new DialogoDeTurmaPorDataFactory();

  it('Snapshot', async (done) => {
    factory.dadoQueExistemHorariosDeTurmaPorData();

    await factory.montarComponente();

    expect(factory.componente).toMatchSnapshot();
    done();
  });

});
