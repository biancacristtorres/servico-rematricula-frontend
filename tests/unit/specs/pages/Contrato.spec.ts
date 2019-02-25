import { ContratoFactory } from '../../factory/pages/ContratoFactory';

describe('Página de Contrato', () => {
  const factory = new ContratoFactory();

  it('Snapshot', async (done) => {
    await factory.montarComponente();
    expect(factory.componente).toMatchSnapshot();
    done();
  });

});
