import store from '@/store';
import AssinarContrato from '@/components/contrato/AssinarContrato.vue';
import { FactoryComponentBase } from '../../FactoryComponentBase';
import { shallowMount } from '@vue/test-utils';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  AssinaturaDeContratoComSucesso,
} from '../../../doubles/stubs/contrato/assinarContrato/AssinaturaDeContratoComSucesso';
import {
  AssinaturaDeContratoComFalha,
} from '../../../doubles/stubs/contrato/assinarContrato/AssinaturaDeContratoComFalha';
import {
  AssinaturaDeContratoComExcecao,
} from '../../../doubles/stubs/contrato/assinarContrato/AssinaturaDeContratoComExcecao';

export class AssinarContratoFactory extends FactoryComponentBase<AssinarContrato> {
  public redirecionamento!: (rota: string) => any;
  public limparInformacoesDoAluno = jest.fn();

  public dadoQueOContratoSejaAssinadoComSucesso(): void {
    Container.bind(HttpService).to(AssinaturaDeContratoComSucesso);
  }

  public dadoQueOContratoNaoPodeSerAssinado(): void {
    Container.bind(HttpService).to(AssinaturaDeContratoComFalha);
  }

  public dadoQueAcontecaErroAoAssinarOContrato(): void {
    Container.bind(HttpService).to(AssinaturaDeContratoComExcecao);
  }

  public criarWrapper(): void {
    this.componente = shallowMount(AssinarContrato, {
      store,
      methods: {
        limparInformacoesDoAluno: this.limparInformacoesDoAluno,
      },
      mocks: {
        $router: {
          push: (to: string) => {
            this.redirecionamento(to);
          },
        },
      },
    });
  }

}
