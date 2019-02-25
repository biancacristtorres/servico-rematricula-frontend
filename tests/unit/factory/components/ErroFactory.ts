import Erro from '@/components/Erro.vue';
import { FactoryComponentBase } from '../FactoryComponentBase';
import { shallowMount, Wrapper } from '@vue/test-utils';
import store, { StoreNamespaces } from '@/store';
import { AutorizacaoMutationTypes } from 'componente-frontend-core/store/autorizacao/mutations';
import { Instituicao } from '@/common/enum/Instituicao';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { AlunoMutationTypes } from '@/store/aluno/mutations';

export class ErroFactory extends FactoryComponentBase<Erro> {
  private titulo!: string;
  private texto!: string;
  private imagem!: string;
  private deveRedirecionarParaOSOL!: boolean;

  private idDoTitulo: string = '#titulo-erro';
  private idDoTexto: string = '#texto-erro';
  private idDaImagem: string = '#imagem-erro';

  public dadoAImagem(imagem: string): any {
    this.imagem = imagem;
  }

  public dadoOTexto(texto: string): void {
    this.texto = texto;
  }

  public dadoOTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  public dadoAExibicaoDoBotaoDeRerecionamento(deveRedirecionarParaOSOL: boolean): void {
    this.deveRedirecionarParaOSOL = deveRedirecionarParaOSOL;
  }

  public dadoQueOAlunoSejaDaInstuicaoUNA(): void {
    const informacoesDoAluno = new InformacoesAluno();
    informacoesDoAluno.codigoInstituicao = Instituicao.UnaBeloHorizonte;

    store.commit(`${ StoreNamespaces.ALUNO }/${ AlunoMutationTypes.SET_INFORMACOES_ALUNO }`, informacoesDoAluno);
  }

  public criarWrapper(): void {
    this.componente = shallowMount(Erro,
      {
        store,
        propsData: {
          titulo: this.titulo,
          texto: this.texto,
          imagem: this.imagem,
          deveRedirecionarParaOSOL: this.deveRedirecionarParaOSOL,
      },
    });
  }

  public get tituloDoErro(): string {
    return this.componente.find(this.idDoTitulo).text();
  }

  public get TextoDoErro(): string {
    return this.componente.find(this.idDoTexto).text();
  }

  public get retornarAoSol(): Wrapper<any> {
    return this.componente.find('#retornar-ao-sol');
  }

  public existeAImagem(): boolean {
    return this.componente.find(this.idDaImagem).exists();
  }

}
