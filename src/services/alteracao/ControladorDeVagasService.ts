import { Turma } from '@/model/Turma';
import { TipoCargaHoraria } from '@/common/enum/TipoCargaHoraria';
import { TurmaComplementar } from '@/model/TurmaComplementar';

export class ControladorDeVagasService {

  public podeSolicitarAviso(turma: Turma): boolean {
    if (turma.eTurmaAtual) {
      return false;
    } else if (this.existeUmaComplementarPraticaSemVagas(turma.complementares)) {
      return true;
    }
    return this.ePraticaSemVaga(turma.codigoTipoCargaHoraria, turma.vagas);
  }

  private existeUmaComplementarPraticaSemVagas(complementares: TurmaComplementar[]): boolean {
    return (complementares || []).some(
      (c) => this.ePraticaSemVaga(c.codigoTipoCargaHoraria, c.vagas),
    );
  }

  private ePraticaSemVaga(tipoCargaHoraria: TipoCargaHoraria, vagas: number) {
    return tipoCargaHoraria === TipoCargaHoraria.Pratica && vagas <= 0;
  }
}
