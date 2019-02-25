import { FactoryServiceBase } from '../../FactoryServiceBase';
import { TurmasEquivalentesService } from '@/services/alteracao/TurmasEquivalentesService';
import {
  DadoDuasTurmasEquivalentes,
} from '../../../doubles/stubs/alteracao/turmasEquivalentes/DadoDuasTurmasEquivalentes';
import {
  DadoDuasTurmasEquivalentesComComposicao,
} from '../../../doubles/stubs/alteracao/turmasEquivalentes/DadoDuasTurmasEquivalentesComComposicao';
import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';

export class TurmasEquivalentesServiceFactory extends FactoryServiceBase<TurmasEquivalentesService> {

  public get servico(): TurmasEquivalentesService {
    return new TurmasEquivalentesService(this.apiStub);
  }

  public dadoQueApiRetorneDuasTurmasEquivalentes(): void {
    this.apiStub = new DadoDuasTurmasEquivalentes();
  }


  public dadoQueApiRetorneDuasTurmasEquivalentesComComposicao(): void {
    this.apiStub = new DadoDuasTurmasEquivalentesComComposicao();
  }

  public get turma48(): Turma {
    const turma48 = new Turma();
    turma48.codigo = 48;
    return turma48;
  }

  public get turma49(): Turma {
    const turma49 = new Turma();
    turma49.codigo = 49;
    return turma49;
  }

  public get turma48ComComplementar(): Turma {
    const turmaComplementar488 = new TurmaComplementar();
    turmaComplementar488.codigo = 488;

    const turma48 = new Turma();
    turma48.codigo = 48;
    turma48.complementares = [turmaComplementar488];

    return turma48;
  }

  public get turma49ComComplementar(): Turma {
    const turmaComplementar499 = new TurmaComplementar();
    turmaComplementar499.codigo = 499;

    const turma49 = new Turma();
    turma49.codigo = 49;
    turma49.complementares = [turmaComplementar499];

    return turma49;
  }
}
