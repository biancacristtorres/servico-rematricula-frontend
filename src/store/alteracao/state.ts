import { Disciplina } from '@/model/Disciplina';
import { Filtro } from '@/model/Filtro';

export class AlteracaoState {
  public disciplinas!: Disciplina[];
  public alterando!: boolean;
  public preparandoTurmas!: boolean;
  public possuiAlteracao!: boolean;
  public filtro!: Filtro;
}

export const state: AlteracaoState = {
  disciplinas: [],
  alterando: false,
  preparandoTurmas: false,
  possuiAlteracao: false,
  filtro: new Filtro(),
};
