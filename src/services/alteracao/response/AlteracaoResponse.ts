import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';

export class AlteracaoResponse {
  public sucesso!: boolean;
  public miniGrade!: HorarioDaMiniGrade[];
  public opcoesDeDialogo!: OpcoesDeDialogo;
}
