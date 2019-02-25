import { binding, when } from 'cucumber-tsflow';
import AlunoWorkspace from '../workspaces/AlunoWorkspace';
import Contrato from '../pages/Contrato';

@binding([AlunoWorkspace])
export default class TelaLoginSteps {
  private paginaContrato!: Contrato;

  constructor(protected alunoWorkspace: AlunoWorkspace) {
    this.paginaContrato = new Contrato();
  }

  @when(/^aceito o contrato$/)
  public async quandoAceitoOContrato() {
    const liEAceito = await this.paginaContrato.liEAceito();

    await this.paginaContrato.elementClick(liEAceito);
  }
}
