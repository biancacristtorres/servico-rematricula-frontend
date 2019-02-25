import store from '@/store';
import ArquivoDeContrato from '@/components/contrato/ArquivoDeContrato.vue';
import { FactoryComponentBase } from '../../FactoryComponentBase';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { BaixarContratoService } from '@/services/contrato/BaixarContratoService';
import { Container } from 'typescript-ioc';
import {
  DadoQueUmPDFDeTesteSejaBaixado,
} from '../../../doubles/stubs/contrato/baixarContratoService/DadoQueUmPDFDeTesteSejaBaixado';

export class ArquivoDeContratoFactory extends FactoryComponentBase<ArquivoDeContrato> {
  private eMobile!: boolean;

  public prepararTeste(): void {
    Container.snapshot(BaixarContratoService);
  }

  public restaurarEstadoInicialDoTeste(): void {
    if (this.espiao) {
      this.espiao.mockRestore();
    }

    Container.restore(BaixarContratoService);
  }

  public criarWrapper(): void {
    this.componente = shallowMount(ArquivoDeContrato, { store,
      computed: {
        eMobile: () => this.eMobile,
      },
    });
  }

  public get visualizadorDePDF(): Wrapper<any> {
    return this.componente.find('#visualizador-de-pdf');
  }

  public get baixarPDF(): Wrapper<any> {
    return this.componente.find('#baixar-pdf');
  }

  public dadoQueEDesktop(): void {
    this.eMobile = false;
  }

  public dadoQueEMobile(): void {
    this.eMobile = true;
  }

  public dadoQueUmPDFDeTesteSejaBaixado(): void {
    Container.bind(BaixarContratoService).to(DadoQueUmPDFDeTesteSejaBaixado);
  }

  public espionarServicoParaBaixarPDF(): void {
    this.espiao = jest.spyOn(DadoQueUmPDFDeTesteSejaBaixado.prototype, 'processar');
  }

}
