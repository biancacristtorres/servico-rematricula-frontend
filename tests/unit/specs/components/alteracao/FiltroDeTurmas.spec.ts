import { Filtro } from '@/model/Filtro';
import {
  FiltroDeTurmasFactory,
} from '../../../factory/components/alteracao/FiltroDeTurmasFactory';

describe('Componente de Filtro de Turmas', () => {
  const factory = new FiltroDeTurmasFactory();

  it('Ao clicar em aplicar filtro, um novo filtro é aplicado na store', async (done) => {
    const filtro = new Filtro();
    filtro.exibirTurnosDiferentes = true;
    factory.dadoOModel(filtro);

    await factory.montarComponente();
    factory.aplicarFiltro();

    expect(factory.filtroDaStoreDeAlteracao.exibirTurnosDiferentes).toBeTruthy();
    done();
  });

  it('Snapshot', async (done) => {
    await factory.montarComponente();

    expect(factory.componente).toMatchSnapshot();
    done();
  });
});
