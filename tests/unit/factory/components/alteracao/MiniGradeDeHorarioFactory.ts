import { FactoryComponentBase } from '../../FactoryComponentBase';
import { shallowMount } from '@vue/test-utils';
import MiniGradeDeHorario from '@/components/alteracao/MiniGradeDeHorario.vue';
import store, { StoreNamespaces } from '@/store';
import { DisciplinaMiniGrade } from '@/model/DisciplinaMiniGrade';
import { DisciplinasPorDiaDeSemanaDaMiniGrade } from '@/model/DisciplinasPorDiaDeSemanaDaMiniGrade';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { MiniGradeActionTypes } from '@/store/miniGrade/actions';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';

export class MiniGradeDeHorarioFactory extends FactoryComponentBase<MiniGradeDeHorario> {

  public dadoQueExistamHorarios(): void {
    const calculoI =  new DisciplinaMiniGrade();
    calculoI.codigoDisciplina = 143924;
    calculoI.nomeDisciplina = 'Cálculo I';

    const disciplinasPorDiaDeSemana = new DisciplinasPorDiaDeSemanaDaMiniGrade();
    disciplinasPorDiaDeSemana[2] = [ calculoI ];
    disciplinasPorDiaDeSemana[5] = [ calculoI ];

    const horario =  new HorarioDaMiniGrade();
    horario.horaInicio = '20:55h';
    horario.disciplinasPorDiaDeSemana = disciplinasPorDiaDeSemana;

    store.dispatch(`${ StoreNamespaces.MINI_GRADE }/${ MiniGradeActionTypes.CARREGAR_MINI_GRADE }`, [ horario ]);
  }

  public dadoQueEstaAcontecendoUmaAlteracaoDeTurma(): void {
    store.commit(`${ StoreNamespaces.ALTERACAO }/${ AlteracaoMutationsTypes.SET_ALTERANDO }`, true);
  }

  public dadoQueNaoEstaAcontecendoUmaAlteracaoDeTurma(): void {
    store.commit(`${ StoreNamespaces.ALTERACAO }/${ AlteracaoMutationsTypes.SET_ALTERANDO }`, false);
  }

  public criarWrapper(): void {
    this.componente = shallowMount(MiniGradeDeHorario, { store });
  }

}
