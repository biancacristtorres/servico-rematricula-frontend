
import { AjudaEProtocolosFactory } from '../../../factory/components/AjudaEProtocolosFactory';

describe('Componente de Cabeçalho', () => {
  const ajudaEProtocolosFactory = new AjudaEProtocolosFactory();

  it('Snapshot', () => {
    ajudaEProtocolosFactory.montarComponente();

    expect(ajudaEProtocolosFactory.componenteAjudaEProtocolos).toMatchSnapshot();
  });
});
