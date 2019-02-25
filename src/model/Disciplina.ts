import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { Turma } from './Turma';

export class Disciplina {
  public codigo: number;
  public nome: string;
  public situacao: SituacaoDaDisciplina;
  public modulo: string;
  public eDisciplinaEletiva: boolean;
  public possuiEquivalenciaDoisPorUm!: boolean;
  public turmas: Turma[] = [];
  public turmasEquivalentes: Turma[] = [];
  public turmasEspeciais: Turma[] = [];

  constructor(codigo: number, nome: string, situacao: SituacaoDaDisciplina,
              modulo: string, eDisciplinaEletiva: boolean) {
    this.codigo = codigo;
    this.nome = nome;
    this.situacao = situacao;
    this.modulo = modulo;
    this.eDisciplinaEletiva = eDisciplinaEletiva;
  }
}
