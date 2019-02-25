export class DisciplinaComInteresse {
  public codigo?: number;
  public nome?: string;
  public interesseManifestado?: boolean;

  constructor(codigo: number, nome: string, interesseManifestado: boolean) {
    this.codigo = codigo;
    this.nome = nome;
    this.interesseManifestado = interesseManifestado;
  }
}
