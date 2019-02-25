import { Wrapper, mount } from '@vue/test-utils';
import PessoaLogada from '@/components/PessoaLogada.vue';
import store, { StoreNamespaces } from '@/store';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { AutorizacaoMutationTypes } from 'componente-frontend-core/store/autorizacao/mutations';
import { AlunoMutationTypes } from '@/store/aluno/mutations';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { FactoryComponentBase } from '../FactoryComponentBase';
import { Horario } from '@/model/Horario';
import { ResumoMutationTypes } from '@/store/resumo/mutations';
import { Instituicao } from '@/common/enum/Instituicao';

export class PessoaLogadaFactory extends FactoryComponentBase<PessoaLogada> {
  public url!: string;

  private setarUsuarioLogado: string =
    `${StoreNamespaces.AUTORIZACAO}/${AutorizacaoMutationTypes.SET_USUARIO_LOGADO}`;

  private setarInformacoesDoAluno: string =
    `${ StoreNamespaces.ALUNO }/${ AlunoMutationTypes.SET_INFORMACOES_ALUNO }`;

  public dadoUmaPessoaLogada(nome: string): void {
    const pessoaLogada = new UsuarioIdentity();
    pessoaLogada.nomeCompleto = nome;

    const informacoesDoAluno = new InformacoesAluno();
    informacoesDoAluno.nomeSocial = nome;

    store.commit(this.setarUsuarioLogado, pessoaLogada);
    store.commit(this.setarInformacoesDoAluno, informacoesDoAluno);
  }

  public dadoUmaPessoaNaInstituicao(instituicao: Instituicao): void {
    const informacoesDoAluno = new InformacoesAluno();
    informacoesDoAluno.codigoInstituicao = instituicao;

    store.commit(this.setarInformacoesDoAluno, informacoesDoAluno);
  }

  public dadoQueAPessoaNaoEstaLogada(): any {
    store.commit(this.setarUsuarioLogado, null);
  }

  public dadoQueAStorePossuaInformacoesDeAluno(): void {
    const informacoesDeAluno = new InformacoesAluno();
    informacoesDeAluno.codigoAluno = 14556;
    informacoesDeAluno.campus = 'campus';

    store.commit(this.setarInformacoesDoAluno, informacoesDeAluno);
  }

  public dadoQueAStorePossuaInformacoesDeResumo(): void {
    const horario = new Horario();
    horario.horaInicioFim = 'horaInicioFim';

    store.commit(
      `${ StoreNamespaces.RESUMO }/${ ResumoMutationTypes.SET_HORARIOS }`, [horario]);
    store.commit(
      `${ StoreNamespaces.RESUMO }/${ ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO }`, ['1', '2', '3']);
  }

  public criarWrapper(): void {
    this.componente = mount(PessoaLogada, { store,
      mocks: {
        $router: {
          push: (to: string) => {
            this.url = to;
          },
        },
      },
    });
  }

  public get botaoDeLogoff(): Wrapper<any> {
    return this.componente.find('#logoff');
  }

  public get oBotaoDeLogoffExiste(): boolean {
    return this.botaoDeLogoff.exists();
  }

  public get nomeDaPessoaRenderizado(): string {
    return this.componente.find('#nome-pessoa').text();
  }

  public get oComponenteFoiExbido(): boolean {
    return this.componente.find('#pessoa-logada-container').exists();
  }

  public get stateDeInformacoesDoAluno(): InformacoesAluno {
    return (store.state as any).aluno.informacoesAluno;
  }

  public get stateDoResumo(): InformacoesAluno {
    return (store.state as any).resumo;
  }

}
