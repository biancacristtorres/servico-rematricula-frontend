export class RotasSemValidacao {

  public static PaginaNaoEncontrada = '/erro/PaginaNaoEncontrada';
  public static PendenciaFinanceira = '/erro/PendenciaFinanceira';
  public static PendenciaAcademica = '/erro/PendenciaAcademica';
  public static SistemaIndisponivel = '/erro/SistemaIndisponivel';
  public static UsuarioNaoAutenticado = '/erro/UsuarioNaoAutenticado';
  public static Contrato = '/Contrato';
  public static login = '/Login';
  public static Inicio = '/Inicio';
  public static Interesse = '/Interesse';
  public static AguardandoRematricula = '/AguardandoRematricula';
  public static LoginAtravesDeToken = '/autorizacao';
  public static RematriculaNaoIniciada = '/erro/RematriculaNaoIniciada';
  public static ErroDeSistema = '/erro/ErroDeSistema';

  public static paginasSemTratamentoDeRedirect: string[] = [
    RotasSemValidacao.PaginaNaoEncontrada,
    RotasSemValidacao.PendenciaFinanceira,
    RotasSemValidacao.PendenciaAcademica,
    RotasSemValidacao.SistemaIndisponivel,
    RotasSemValidacao.UsuarioNaoAutenticado,
    RotasSemValidacao.Contrato,
    RotasSemValidacao.login,
    RotasSemValidacao.Inicio,
    RotasSemValidacao.Interesse,
    RotasSemValidacao.AguardandoRematricula,
    RotasSemValidacao.LoginAtravesDeToken,
    RotasSemValidacao.RematriculaNaoIniciada,
    RotasSemValidacao.ErroDeSistema,
  ];

  public static EUmaRotaSemValidacao(path: string) {
    return this.paginasSemTratamentoDeRedirect.some((item) => path.toLowerCase().includes(item.toLowerCase()));
  }
}
