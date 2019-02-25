import { StubBase } from '../../StubBase';
import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';

export class DadoUmTurmaEspecialComComposicao extends StubBase {

  protected dadoUmResponse(): any {
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

    return new Array<Turma> (turmaEspecial);
  }

}
