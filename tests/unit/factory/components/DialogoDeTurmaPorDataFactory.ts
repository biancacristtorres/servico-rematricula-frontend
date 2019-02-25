import { FactoryComponentBase } from '../FactoryComponentBase';
import DialogoDeTurmaPorData from '@/components/alteracao/DialogoDeTurmaPorData.vue';
import { shallowMount } from '@vue/test-utils';
import { HorariosDeTurmaPorData } from '@/model/HorariosDeTurmaPorData';
import { HorarioPorData } from '@/model/HorarioPorData';
import { Data } from '@/model/Data';
import { Turma } from '@/model/Turma';

export class DialogoDeTurmaPorDataFactory extends FactoryComponentBase<DialogoDeTurmaPorData> {
  private horariosDeTurmaPorData!: HorariosDeTurmaPorData;

  public dadoQueExistemHorariosDeTurmaPorData(): void {
    const data = new Data();

    const horarioPorData = new HorarioPorData();
    horarioPorData.codigoDiaSemana = 2;
    horarioPorData.datas = [ data ];
    horarioPorData.datasParaExibicao = ['Segunda 13 horas'];

    this.horariosDeTurmaPorData = new HorariosDeTurmaPorData(
      'Cálculo', 'Turma', [ horarioPorData ],
    );
  }

  public criarWrapper(): void {
    this.componente =  shallowMount(DialogoDeTurmaPorData, {
      propsData: {
        model: this.horariosDeTurmaPorData,
      },
    });
  }

}
