import { Horario } from '@/model/Horario';
import { DisciplinasPorDiaDeSemana } from '@/model/DisciplinasPorDiaDeSemana';
import { DisciplinaResumo } from '@/model/DisciplinaResumo';
import { StatusDaDisciplina } from '@/common/enum/StatusDaDisciplina';

export class HorarioModelBuilder {

  public get opcoes() {
    const model = new Horario();
    model.horaInicioFim = this.horaInicioFim;
    model.disciplinasPorDiaDeSemana = this.disciplinasPorDiaDeSemana;
    return model;
  }

  public static dadosAsOpcoes() {
    return new HorarioModelBuilder();
  }
  private horaInicioFim: string;
  private disciplinasPorDiaDeSemana: DisciplinasPorDiaDeSemana;

  private constructor() {
    this.horaInicioFim = '19:00 - 19:50h';
    this.disciplinasPorDiaDeSemana = new DisciplinasPorDiaDeSemana();
    this.disciplinasPorDiaDeSemana[2] = [];
    this.disciplinasPorDiaDeSemana[3] = [];
    this.disciplinasPorDiaDeSemana[4] = [];
    this.disciplinasPorDiaDeSemana[5] = [];
    this.disciplinasPorDiaDeSemana[6] = [];
    this.disciplinasPorDiaDeSemana[7] = [];
  }

  public comDisciplinaConfrimada(): HorarioModelBuilder {
    const disciplina = new DisciplinaResumo();
    disciplina.codigoDisciplina = 96691;
    disciplina.nomeDisciplina = 'Contabilidade Geral';
    disciplina.descricaoTurma = 'AEM3N-BCA';
    disciplina.status = StatusDaDisciplina.Confirmada;
    disciplina.descricaoTipoCargaHoraria = 'Teórica';
    disciplina.campus = 'Balneário Camboriú';
    disciplina.ePorData = false;
    disciplina.datas = [];

    this.disciplinasPorDiaDeSemana[2] = [disciplina];

    return this;
  }

  public comDisciplinaReservada(): HorarioModelBuilder {
    const disciplina = new DisciplinaResumo();
    disciplina.codigoDisciplina = 10000;
    disciplina.nomeDisciplina = 'Laboratório';
    disciplina.descricaoTurma = 'XXXXX';
    disciplina.status = StatusDaDisciplina.AguardandoConfirmacao;
    disciplina.descricaoTipoCargaHoraria = 'Prática';
    disciplina.campus = 'Aymoré';
    disciplina.ePorData = false;
    disciplina.datas = [];

    this.disciplinasPorDiaDeSemana[3] = [disciplina];

    return this;
  }

}
