import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Disciplina } from '@/model/Disciplina';
import { TurmasMutationRequest } from '@/store/alteracao/request/TurmasMutationRequest';
import { Turma } from '@/model/Turma';
import { TurmasEquivalentesMutationRequest } from '@/store/alteracao/request/TurmasEquivalentesMutationRequest';
import {
  DadoDuasDisciplinasDisponiveis,
} from '../../../../doubles/stubs/alteracao/disciplinasDisponiveis/DadoDuasDisciplinasDisponiveis';
import { FactoryStoreAlteracaoBase } from '../FactoryStoreAlteracaoBase';
import { TurmasEspeciaisMutationRequest } from '@/store/alteracao/request/TurmasEspeciaisMutationRequest';

export class TurmasMutationFactory extends FactoryStoreAlteracaoBase {
  public get turma(): Turma {
    const turma = new Turma();
    turma.codigo = 1;
    turma.codigoUnico = '1';
    return turma;
  }

  public get turmaEquivalente(): Turma {
    const turma = new Turma();
    turma.codigo = 2;
    turma.codigoUnico = '2';
    return turma;
  }

  public get turmaEspecial(): Turma {
    const turma = new Turma();
    turma.codigo = 589;
    turma.eTurmaAtual = true;
    turma.minimoParaConfirmacao = 5;
    turma.numeroDeReserva = 10;
    return turma;
  }

  public get turmaAtual(): Turma {
    const turmaAtual = new Turma();
    turmaAtual.codigo = 4;
    turmaAtual.codigoUnico = '4';
    turmaAtual.eTurmaAtual = true;
    return turmaAtual;
  }

  public get tumasMutationRequest(): TurmasMutationRequest {
    return new TurmasMutationRequest(this.codigoCalculoI, [ this.turma ]);
  }

  public get tumasEquivalentesMutationRequest(): TurmasEquivalentesMutationRequest {
    return new TurmasEquivalentesMutationRequest(this.codigoCalculoI, [ this.turmaEquivalente ]);
  }

  public get turmasEspeciaisMutationRequest(): TurmasEspeciaisMutationRequest {
    return new TurmasEspeciaisMutationRequest(this.codigoCalculoI, [ this.turmaEspecial ]);
  }

  public get stateDeCalculoI(): Disciplina {
    return this.store.state.disciplinas.find(
      (d: Disciplina) => d.codigo === this.codigoCalculoI,
    );
  }

  protected stubarApi(): void {
    Container.bind(HttpService).to(DadoDuasDisciplinasDisponiveis);
  }

}
