import request from '@/config/axios/interceptors/request';
import store, { StoreNamespaces } from '@/store';
import { AutorizacaoMutationTypes } from 'componente-frontend-core/store/autorizacao/mutations';

describe('interceptors > request', () => {
  const setTokenMutation = `${StoreNamespaces.AUTORIZACAO}/${AutorizacaoMutationTypes.SET_TOKEN}`;

  it('Quando não existe header de autorização, o token é concatenado com Bearer', async (done) => {
    store.commit(setTokenMutation, 'token');

    const config = {
      url: 'https://anima',
      headers: {
        Authorization: undefined,
      },
    };

    const atual = request(config);
    expect(atual.headers.Authorization).toEqual('Bearer token');
    done();
  });

  it('Quando existe header de autorização, o config é mantido', async (done) => {
    store.commit(setTokenMutation, 'token');

    const config = {
      url: 'https://anima',
      headers: {
        Authorization: 'Bearer xpto',
      },
    };

    const atual = request(config);
    expect(atual.headers.Authorization).toEqual('Bearer xpto');
    done();
  });
});
