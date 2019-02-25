import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { ServiceBase } from './ServiceBase';
import store, { StoreNamespaces } from '@/store';
import { AlunoActionTypes } from '@/store/aluno/actions';

export class AlunoService extends ServiceBase {
  protected urlBase: string = `${process.env.VUE_APP_API_URL}`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async obterInformacoesAluno(codigoDoAluno: number): Promise<InformacoesAluno> {
    const url = `${this.urlBase}/api/ObterInformacoesAluno?codigoAluno=${codigoDoAluno}`;

    const response = await this.http.get(url);

    return response.data;
  }

  public async carregarInformacoesDoAlunoSeNecessario() {
    const storeState = (store.state as any);
    const informacoesDoAlunoCarregadas = storeState.aluno.informacoesAluno != null;
    const codigoAluno = storeState.autorizacao!.usuarioLogado!.codigo;

    if (!informacoesDoAlunoCarregadas && codigoAluno) {
      const actionObterInformacoes = `${StoreNamespaces.ALUNO}/${AlunoActionTypes.OBTER_INFORMACOES_ALUNO}`;

      await store.dispatch(actionObterInformacoes, codigoAluno).then(() => {
        const watcher = store.watch((state) => (state as any).aluno.informacoesAluno, () => {
          watcher();
        });
      });
    }
  }
}
