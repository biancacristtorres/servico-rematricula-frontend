import { Wrapper, shallowMount } from '@vue/test-utils';
import PaginaNaoEncontrada from '@/pages/erro/PaginaNaoEncontrada.vue';
import PendenciaAcademica from '@/pages/erro/PendenciaAcademica.vue';
import PendenciaFinanceira from '@/pages/erro/PendenciaFinanceira.vue';
import SistemaIndisponivel from '@/pages/erro/SistemaIndisponivel.vue';
import UsuarioNaoAutenticado from '@/pages/erro/UsuarioNaoAutenticado.vue';
import RematriculaNaoIniciada from '@/pages/erro/RematriculaNaoIniciada.vue';
import ErroDeSistema from '@/pages/erro/ErroDeSistema.vue';

export class PaginasDeErroFactory {
  public PaginaNaoEncontrada!: Wrapper<PaginaNaoEncontrada>;
  public PendenciaAcademica!: Wrapper<PendenciaAcademica>;
  public PendenciaFinanceira!: Wrapper<PendenciaFinanceira>;
  public SistemaIndisponivel!: Wrapper<SistemaIndisponivel>;
  public UsuarioNaoAutenticado!: Wrapper<UsuarioNaoAutenticado>;
  public RematriculaNaoIniciada!: Wrapper<RematriculaNaoIniciada>;
  public ErroDeSistema!: Wrapper<ErroDeSistema>;

  public montarPaginas(): void {
    this.PaginaNaoEncontrada = shallowMount(PaginaNaoEncontrada);
    this.PendenciaAcademica = shallowMount(PendenciaAcademica);
    this.PendenciaFinanceira = shallowMount(PendenciaFinanceira);
    this.SistemaIndisponivel = shallowMount(SistemaIndisponivel);
    this.UsuarioNaoAutenticado = shallowMount(UsuarioNaoAutenticado);
    this.RematriculaNaoIniciada = shallowMount(RematriculaNaoIniciada);
    this.ErroDeSistema = shallowMount(ErroDeSistema);
  }
}
