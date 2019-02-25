
export class AlertasDeAlteracaoResponse {
  public existemAlertasParaExibicao!: boolean;
  public alertas!: string[];

  constructor(alertas: string[]) {
    this.alertas = alertas;
    this.existemAlertasParaExibicao = alertas.length > 0;
  }
}
