import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { FactoryStoreAlteracaoBase } from '../FactoryStoreAlteracaoBase';
import {
  DadoUmTurmaEspecialComComposicao,
} from '../../../../doubles/stubs/alteracao/turmasEspeciais/DadoUmTurmaEspecialComComposicao';

export class TurmasEspeciaisActionFactory extends FactoryStoreAlteracaoBase {

  public espionarApi(): void {
    this.espiao = jest.spyOn(DadoUmTurmaEspecialComComposicao.prototype, 'get');
  }

  protected stubarApi(): void {
    Container.bind(HttpService).to(DadoUmTurmaEspecialComComposicao);
  }

  public get turmaEspecial(): Turma {
    const turmaComplementar = new TurmaComplementar();
    turmaComplementar.codigo = 1;
    turmaComplementar.minimoParaConfirmacao = 20;
    turmaComplementar.numeroDeReserva = 5;

    const turmaEspecial = new Turma();
    turmaEspecial.codigo = 589;
    turmaEspecial.eTurmaAtual = true;
    turmaEspecial.minimoParaConfirmacao = 5;
    turmaEspecial.numeroDeReserva = 10;
    turmaEspecial.complementares = [ turmaComplementar ];

    return turmaEspecial;
  }

}
