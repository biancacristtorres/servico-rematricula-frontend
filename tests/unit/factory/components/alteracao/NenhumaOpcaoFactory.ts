import store, { StoreNamespaces } from '@/store';
import NenhumaOpcao from '@/components/alteracao/NenhumaOpcao.vue';
import { FactoryComponentBase } from '../../FactoryComponentBase';
import { mount, Wrapper } from '@vue/test-utils';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { Turma } from '@/model/Turma';

export class NenhumaOpcaoFactory extends FactoryComponentBase<NenhumaOpcao> {
  public codigoDaDisciplina!: number;

  public dadoADisciplina(codigoDaDisciplina: number): void {
    this.codigoDaDisciplina = codigoDaDisciplina;
  }

  public dadoQueADisciplinaPossuaTurmas(): void {
    const disciplinaComTurmas = this.disciplina();
    disciplinaComTurmas.turmas = [new Turma()];

    this.dadoOStateCom(disciplinaComTurmas);
  }

  public dadoQueADisciplinaNaoPossuaTurmas(): void {
    const disciplina = this.disciplina();

    this.dadoOStateCom(disciplina);
  }

  public dadoQueADisciplinaTenhaUmaTurmaAtual(): void {
    const turmaAtual = new Turma();
    turmaAtual.eTurmaAtual = true;

    const disciplinaComTurmaAtual = this.disciplina();
    disciplinaComTurmaAtual.turmas = [turmaAtual];

    this.dadoOStateCom(disciplinaComTurmaAtual);
  }

  public dadoQueADisciplinaNaoTenhaUmaTurmaAtual(): void {
    const turmaNaoAtual = new Turma();
    turmaNaoAtual.eTurmaAtual = false;

    const disciplinaSemTurmaAtual = this.disciplina();
    disciplinaSemTurmaAtual.turmas = [turmaNaoAtual];

    this.dadoOStateCom(disciplinaSemTurmaAtual);
  }

  public dadoQueExisteUmaSelecaoEmProcessamento(): void {
    const namespace = StoreNamespaces.ALTERACAO;
    const setAlterando = AlteracaoMutationsTypes.SET_ALTERANDO;

    store.commit(`${ namespace }/${ setAlterando }`, true);
  }

  public dadoQueNaoExisteUmaSelecaoEmProcessamento(): void {
    const namespace = StoreNamespaces.ALTERACAO;
    const setAlterando = AlteracaoMutationsTypes.SET_ALTERANDO;

    store.commit(`${ namespace }/${ setAlterando }`, false);
  }

  public criarWrapper(): void {
    this.componente = mount(NenhumaOpcao, {
      store,
      propsData: {
        codigoDaDisciplina: this.codigoDaDisciplina,
      },
    });
  }

  public get radioDeNenhumaOpcao(): Wrapper<any> {
    return this.componente.find(`#nenhuma-opcao-${ this.codigoDaDisciplina }`);
  }

  public get loading(): Wrapper<any> {
    return this.componente.find('.aguardando-alteracao');
  }

  public get radioDeNenhumaOpcaoEstaCheckado(): boolean {
    const valor = this.radioDeNenhumaOpcao.attributes('value');
    return valor === 'true';
  }

  private disciplina(): Disciplina {
    return new Disciplina(
      this.codigoDaDisciplina, 'Cálculo I', SituacaoDaDisciplina.Liberada, '3B', false,
    );
  }

  private dadoOStateCom(...disciplinas: Disciplina[]) {
    store.commit(`${ StoreNamespaces.ALTERACAO }/${ AlteracaoMutationsTypes.SET_DISCIPLINAS }`, disciplinas);
  }

}
