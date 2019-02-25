import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';

export class MiniGradeState {
  public horarios: HorarioDaMiniGrade[];

  constructor() {
    this.horarios = [];
  }
}

export const state: MiniGradeState = new MiniGradeState();
