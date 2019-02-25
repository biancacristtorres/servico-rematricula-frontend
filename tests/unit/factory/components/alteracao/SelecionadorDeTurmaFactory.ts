import SelecionadorDeTurma from '@/components/alteracao/SelecionadorDeTurma.vue';
import { Turma } from '@/model/Turma';
import { FactoryComponentBase } from '../../FactoryComponentBase';
import { mount } from '@vue/test-utils';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoUmaRemocaoDeTurmaComErro,
} from '../../../doubles/stubs/alteracao/remocaoDeTurmas/DadoUmaRemocaoDeTurmaComErro';
import {
  DadoUmaSelecaoDeTurmaComSucesso,
} from '../../../doubles/stubs/alteracao/selecaoDeTurmas/DadoUmaSelecaoDeTurmaComSucesso';
import store, { StoreNamespaces } from '@/store';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '../../../../../src/common/enum/SituacaoDaDisciplina';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { DisciplinaMiniGrade } from '@/model/DisciplinaMiniGrade';
import { DisciplinasPorDiaDeSemanaDaMiniGrade } from '@/model/DisciplinasPorDiaDeSemanaDaMiniGrade';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { MiniGradeActionTypes } from '@/store/miniGrade/actions';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { AlunoMutationTypes } from '@/store/aluno/mutations';
import { Periodicidade } from '../../../../../src/common/enum/Periodicidade';


export class SelecionadorDeTurmaFactory extends FactoryComponentBase<SelecionadorDeTurma> {

  public turmaEmContexto!: Turma;
  private codigoDeCalculoIntegral: number = 20000;

  public dadoUmaTurmaAtual(): void {
    const turma4528 = new Turma();
    turma4528.codigoUnico = '4528';
    turma4528.codigoDaDisciplina = this.codigoDeCalculoIntegral;
    turma4528.codigoPeriodicidade = Periodicidade.Semestral;

    turma4528.eTurmaAtual = true;

    this.turmaEmContexto = turma4528;
  }
  public dadoUmaTurmaQueNaoEAtualComPeriodicidadeSemestral(): void {

    const turma5300 = new Turma();
    turma5300.codigoUnico = '5300';
    turma5300.codigoDaDisciplina = this.codigoDeCalculoIntegral;
    turma5300.eTurmaAtual = false;
    turma5300.codigoPeriodicidade = Periodicidade.Semestral;

    this.turmaEmContexto = turma5300;
  }

  public dadoUmaTurmaQueNaoEAtualComPeriodicidadeAnual(): void {

    const turma6000 = new Turma();
    turma6000.codigoUnico = '6000';
    turma6000.codigoDaDisciplina = this.codigoDeCalculoIntegral;
    turma6000.eTurmaAtual = false;
    turma6000.codigoPeriodicidade = Periodicidade.Anual;

    this.turmaEmContexto = turma6000;
  }

  public dadoQueCalculoIntegralEstejaNaStoreComATurmaEmContexto() {
    const disciplina = new Disciplina(this.codigoDeCalculoIntegral,
      'Calculo Integral',
      SituacaoDaDisciplina.Liberada,
      '2A',
      false,
    );
    disciplina.turmas = [this.turmaEmContexto];

    store.commit(
      `${StoreNamespaces.ALTERACAO}/${AlteracaoMutationsTypes.SET_DISCIPLINAS}`,
      [disciplina],
    );
  }

  public dadoQueUmCancelamentoDeMatriculaVenhaAFalhar(): void {
    Container.bind(HttpService).to(DadoUmaRemocaoDeTurmaComErro);
  }

  public dadoQueUmaMatriculaOcorraComSucesso(): void {
    Container.bind(HttpService).to(DadoUmaSelecaoDeTurmaComSucesso);
  }

  public dadoQueNaoExisteUmLoading(): void {

    store.commit(
      `${StoreNamespaces.ALTERACAO}/${AlteracaoMutationsTypes.SET_ALTERANDO}`,
      false,
    );
    store.commit(
      `${StoreNamespaces.ALTERACAO}/${AlteracaoMutationsTypes.SET_PREPARANDO_TURMAS}`,
      false,
    );
  }

  public dadoQueExistaUmAlunoNaStore(): void {
    const informacoesDoAluno = new InformacoesAluno();
    informacoesDoAluno.codigoMarca = 1;

    store.commit(`${ StoreNamespaces.ALUNO }/${ AlunoMutationTypes.SET_INFORMACOES_ALUNO }`, informacoesDoAluno);
  }

  public dadoQueExistaUmAlunoSaoJudasComPeriodicidadeAnualNaStore(): void {
    const informacoesDoAluno = new InformacoesAluno();
    informacoesDoAluno.codigoMarca = 3;
    informacoesDoAluno.codigoPeriodicidade = Periodicidade.Anual;

    store.commit(`${ StoreNamespaces.ALUNO }/${ AlunoMutationTypes.SET_INFORMACOES_ALUNO }`, informacoesDoAluno);
  }

  public criarWrapper(): void {

    this.componente = mount(SelecionadorDeTurma, {
      localVue: this.vueComPluginDeDialogo,
      store,
      propsData: {
        turma: this.turmaEmContexto,
        codigoDaDisciplina: this.codigoDeCalculoIntegral,
      },
    });
  }

  public async clicarNaTurmaEAguardar(): Promise<void> {
    this.clicarNaTurma();
    await this.aguardarRenderizacao();
  }

  public clicarNaTurma(): void {
    const elemento = this.componente.find(`#turma-${ this.turmaEmContexto.codigoUnico }`);
    elemento.trigger('click');
  }

  public estaCarregando(): boolean {
    const namespace = StoreNamespaces.ALTERACAO;
    const estaCarregando = AlteracaoGetterTypes.ESTA_CARREGANDO;

    return store.getters[`${ namespace }/${ estaCarregando }`];
  }
}
