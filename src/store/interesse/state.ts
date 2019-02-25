import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';

export class InteresseState {
  public disciplinas?: DisciplinaComInteresse[];
}

export const state: InteresseState = { disciplinas: [] };
