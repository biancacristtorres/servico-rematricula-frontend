import { FactoryComponentBase } from '../FactoryComponentBase';
import { shallowMount } from '@vue/test-utils';
import TokenAluno from '@/pages/autorizacao/token/_tokenAluno.vue';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import store from '@/store';

export class TokenAlunoFactory extends FactoryComponentBase<TokenAluno> {

  public get usuarioLogado(): UsuarioIdentity {
    return (store.state as any).autorizacao.usuarioLogado;
  }

  public get eImpersonate(): boolean {
    return (store.state as any).autorizacao.impersonate;
  }
  public redirecionamento!: (rota: string) => any;
  private $route: any;

  public criarWrapper(): void {
    this.componente = shallowMount(TokenAluno, {
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

  public dadoUmaURLComOTokenDoRonaldo() {
    this.$route = {
      path: '/',
      hash: '',
      params: {
        // tslint:disable-next-line
        tokenAluno : 'eyJhbGciOiJIUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiUm9uYWxkbyIsImNvZGlnb0FsdW5vIjoxNDU1MzR9.GDJ3v93B8XoyX7mvB4jDVb-gPcPG-uvS8Koi6OlGUPc',
      },
    };
  }
}
