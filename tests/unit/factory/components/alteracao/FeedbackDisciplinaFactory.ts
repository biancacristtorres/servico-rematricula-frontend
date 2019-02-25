import store, { StoreNamespaces } from '@/store';
import FeedbackDisciplina from '@/components/alteracao/FeedbackDisciplina.vue';
import { FactoryComponentBase } from '../../FactoryComponentBase';
import { mount, Wrapper } from '@vue/test-utils';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';

export class FeedbackDisciplinaFactory extends FactoryComponentBase<FeedbackDisciplina> {
  public codigoDaDisciplina!: number;
  public possuiEquivalenciaDoisPorUm!: boolean;

  public dadoADisciplina(codigoDaDisciplina: number): void {
    this.codigoDaDisciplina = codigoDaDisciplina;
  }

  public dadoQueADisciplinaPossuiEquivalenciaDoisPorUm(): void {
    const disciplinaComEquivalenciaDoisPorUm = this.disciplina();
    this.possuiEquivalenciaDoisPorUm = true;
    disciplinaComEquivalenciaDoisPorUm.possuiEquivalenciaDoisPorUm = this.possuiEquivalenciaDoisPorUm;

    this.dadoOStateCom(disciplinaComEquivalenciaDoisPorUm);
  }

  public dadoQueADisciplinaNaoPossuiEquivalenciaDoisPorUm(): void {
    const disciplinaSemEquivalenciaDoisPorUm = this.disciplina();
    this.possuiEquivalenciaDoisPorUm = false;
    disciplinaSemEquivalenciaDoisPorUm.possuiEquivalenciaDoisPorUm = this.possuiEquivalenciaDoisPorUm;

    this.dadoOStateCom(disciplinaSemEquivalenciaDoisPorUm);
  }

  public criarWrapper(): void {
    this.componente = mount(FeedbackDisciplina, {
      store,
      propsData: {
        codigoDaDisciplina: this.codigoDaDisciplina,
        possuiEquivalenciaDoisPorUm: this.possuiEquivalenciaDoisPorUm,
      },
    });
  }

  public get getMensagemFeedback(): string {
    const componenteMensagem = this.componente
    .find(`#mensagem-equivalencia-dois-por-um-${this.codigoDaDisciplina}`);

    if (componenteMensagem.exists()) {
      return componenteMensagem.text();
    }
    return '';
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
