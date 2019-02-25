export class DadoQueUmPDFDeTesteSejaBaixado  {

  public processar(codigoDoAluno: any): Promise<string> {
    return new Promise((resolve) => resolve('teste.pdf'));
  }

}
