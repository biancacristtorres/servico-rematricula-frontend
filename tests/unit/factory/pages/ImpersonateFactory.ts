import { FactoryComponentBase } from '../FactoryComponentBase';
import { shallowMount } from '@vue/test-utils';
import Impersonate from '@/pages/autorizacao/token/_tokenFuncionario/_impersonate.vue';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import store from '@/store';

export class ImpersonateFactory extends FactoryComponentBase<Impersonate> {

  public get usuarioLogado(): UsuarioIdentity {
    return (store.state as any).autorizacao.usuarioLogado;
  }


  public get usuarioDecodificado(): any {
    return (store.state as any).autorizacao.usuarioDecodificado;
  }

  public get eImpersonate(): boolean {
    return (store.state as any).autorizacao.impersonate;
  }
  public redirecionamento!: (rota: string) => any;
  private $route: any;

  public criarWrapper(): void {
    this.componente = shallowMount(Impersonate, {
      store,
      mocks: {
        $route: this.$route,
        $router: {
          push: (to: string) => {
            this.redirecionamento(to);
          },
        },
      },
    });
  }

  public dadoUmaURLComOTokenDeFuncionarioFazendoImpersonateParaOAluno(codigoDoAluno: number) {
    this.$route = {
      path: '/',
      hash: '',
      params: {
        // tslint:disable-next-line
        tokenFuncionario : 'eyJhbGciOiJIUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiRnVuY2lvbmFyaW8iLCJjb2RpZ29BbHVubyI6MTQ1NTM0fQ.0Eu3MWZF9YxtDFKsBF3gjzuHOb2ym3DdbiFjMcGlZjY',
        impersonate: codigoDoAluno,
      },
    };
  }
}
