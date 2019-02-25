import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { AlteracaoState } from '@/store/alteracao/state';
import { FiltrarStateDeDisciplinaService } from '@/services/alteracao/FiltrarStateDeDisciplinaService';

export class FiltrarStateDeDisciplinaServiceFactory {
  public codigoDeCalculo1: number = 1;
  public state!: AlteracaoState;

  public get calculoI(): Disciplina {
    return new Disciplina(this.codigoDeCalculo1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false);
  }

  public dadoQueCalculoIEstaNoStateDeAlteracao(): void {
    this.state = new AlteracaoState();
    this.state.disciplinas = [this.calculoI];
  }

  public dadoUmStateSemDisciplinas(): void {
    this.state = new AlteracaoState();
  }

  public get servico(): FiltrarStateDeDisciplinaService {
    return new FiltrarStateDeDisciplinaService();
  }

}
