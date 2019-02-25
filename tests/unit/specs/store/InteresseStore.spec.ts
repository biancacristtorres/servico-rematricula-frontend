import store, { StoreNamespaces } from '@/store';
import { Container } from 'typescript-ioc';
import { InteresseService } from '@/services/InteresseService';
import { InteresseServiceStub } from '../../doubles/stubs/interesse/InteresseServiceStub';
import { InteresseActionTypes } from '@/store/interesse/actions';
import { InteresseGetterTypes } from '@/store/interesse/getters';
import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';
import { ManifestarInteresseRequest } from '@/store/interesse/request/ManifestarInteresseRequest';

describe('store > Interesse', () => {
  const obterDisciplinasPendentesAction =
    `${StoreNamespaces.INTERESSE}/${InteresseActionTypes.OBTER_DISCIPLINAS_PENDENTES}`;

  const manifestarInteresseAction =
    `${StoreNamespaces.INTERESSE}/${InteresseActionTypes.MANIFESTAR_INTERESSE}`;

  const disciplinasPendentesGetter =
    `${StoreNamespaces.INTERESSE}/${InteresseGetterTypes.DISCIPLINAS_PENDENTES}`;

  beforeAll(() => {
    Container.bind(InteresseService).to(InteresseServiceStub);
  });

  it('Carrega as disciplinas pendentes na store', async (done) => {
    const codigoDoAluno = 123;

    await store.dispatch(obterDisciplinasPendentesAction, codigoDoAluno);

    const disciplinas = store.getters[disciplinasPendentesGetter];

    expect(disciplinas).toHaveLength(3);
    done();
  });

  it('Posta as disciplinas interessadas', async (done) => {
    const codigoDoAluno = 123;
    const calculoI = new DisciplinaComInteresse(1, 'Cálculo I', true);
    const fisicaII = new DisciplinaComInteresse(2, 'Física II', true);
    const disciplinas = new Array<DisciplinaComInteresse>(calculoI, fisicaII);

    const spy = jest.spyOn(InteresseServiceStub.prototype, 'manifestarInteresse');

    await store
      .dispatch(manifestarInteresseAction, new ManifestarInteresseRequest(codigoDoAluno, disciplinas));

    expect(spy).toBeCalledWith(codigoDoAluno, disciplinas);

    done();
  });

  afterAll(() => {
    Container.restore(InteresseService);
  });

});
