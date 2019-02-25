import store, { StoreNamespaces } from '@/store';
import { Container } from 'typescript-ioc';
import { ResumoService } from '@/services/resumo/ResumoService';
import { ResumoServiceStub } from '../../../../doubles/stubs/resumo/ResumoServiceStub';
import { ResumoActionTypes } from '@/store/resumo/actions';

describe('store > Resumo', () => {
  const ObterResumoAction = `${StoreNamespaces.RESUMO}/${ResumoActionTypes.OBTER_RESUMO}`;

  beforeAll(() => {
    Container.bind(ResumoService).to(ResumoServiceStub);
  });

  it('Carrega o resumo na store', async (done) => {
    const codigoDoAluno = 123;

    await store.dispatch(ObterResumoAction, codigoDoAluno);

    const horarios = (store.state as any).resumo.horarios;

    expect(horarios).toHaveLength(2);
    done();
  });


  it('Carrega o boolean informando que existem disciplinas do resumo na store', async (done) => {
    const codigoDoAluno = 123;

    await store.dispatch(ObterResumoAction, codigoDoAluno);

    const existemDisciplinas = (store.state as any).resumo.existemDisciplinas;

    expect(existemDisciplinas).toBeTruthy();
    done();
  });

  afterAll(() => {
    Container.restore(ResumoService);
  });

});
