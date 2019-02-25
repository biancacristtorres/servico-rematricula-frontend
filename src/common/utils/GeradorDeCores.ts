/* tslint:disable: no-bitwise */
export class GeradorDeCores {
  public static GerarUmaCorBaseadaNumaString(parametro: string) {
    let hash = 0;
    for (let i = 0; i < parametro.length; i++) {
        hash = parametro.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
}
