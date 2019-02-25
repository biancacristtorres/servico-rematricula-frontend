import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';
import { TurmasEspeciaisService } from '@/services/alteracao/TurmasEspeciaisService';
import { FactoryServiceBase } from '../../FactoryServiceBase';
import {
  DadoUmTurmaEspecialComComposicao,
} from '../../../doubles/stubs/alteracao/turmasEspeciais/DadoUmTurmaEspecialComComposicao';

export class TurmasEspeciaisServiceFactory extends FactoryServiceBase<TurmasEspeciaisService> {

  public dadoQueApiRetorneUmaTurmaEspecialComComposicao(): void {
    this.apiStub = new DadoUmTurmaEspecialComComposicao();
  }

  public get servico(): TurmasEspeciaisService {
    return new TurmasEspeciaisService(this.apiStub);
  }

  public get turmaEspecialComComposicao(): Turma {
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
