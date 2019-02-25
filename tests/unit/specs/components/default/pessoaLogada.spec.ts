import { PessoaLogadaFactory } from '../../../factory/components/PessoaLogadaFactory';
import { Instituicao } from '@/common/enum/Instituicao';

describe('Componente de pessoa logada', () => {
  const factory = new PessoaLogadaFactory();

  it('Quando uma pessoa estiver logada, então o componente deve exibir o nome da pessoa', async (done) => {
    factory.dadoUmaPessoaLogada('Maria');

    await factory.montarComponente();

    expect(factory.oComponenteFoiExbido).toBeTruthy();
    expect(factory.nomeDaPessoaRenderizado).toEqual('Maria');
    done();
  });

  it('Quando uma pessoa não estiver logada, então o componente não deve ser exibido', async (done) => {
    factory.dadoQueAPessoaNaoEstaLogada();

    await factory.montarComponente();

    expect(factory.oComponenteFoiExbido).toBeFalsy();
    done();
  });

  it('Quando uma pessoa estiver logada, então existe um botão logoff', async (done) => {
    factory.dadoUmaPessoaLogada('Maria');

    await factory.montarComponente();

    expect(factory.oBotaoDeLogoffExiste).toBeTruthy();
    done();
  });

  it('Ao fazer logoff, a store volta ao estado default', async (done) => {
    factory.dadoQueAStorePossuaInformacoesDeAluno();
    factory.dadoQueAStorePossuaInformacoesDeResumo();
    factory.dadoUmaPessoaNaInstituicao(Instituicao.UnaBeloHorizonte);
    window.location.assign = jest.fn();

    await factory.montarComponente();
    factory.botaoDeLogoff.trigger('click');

    await factory.aguardarRenderizacao();
    expect(factory.stateDeInformacoesDoAluno).toBeUndefined();
    expect(factory.stateDoResumo).toEqual({
      horarios: [],
      disciplinasSemHorario: [],
      existemDisciplinas: true,
      existemDisciplinasNaFilaDeEspera: false,
      existemTurmasEspeciaisNaoConfirmadas: false,
    });
    done();
  });

  it('Redireciona para o SOL ao fazer logoff', async (done) => {
    factory.dadoUmaPessoaLogada('Maria');
    factory.dadoUmaPessoaNaInstituicao(Instituicao.UnaBeloHorizonte);
    window.location.assign = jest.fn();

    await factory.montarComponente();
    factory.botaoDeLogoff.trigger('click');

    await factory.aguardarRenderizacao();

    const esperado = `https://aluno.una.br/SOL/aluno/index.php/index/seguranca/dev/instituicao/${
      Instituicao.UnaBeloHorizonte
      }`;
    expect(window.location.assign).toBeCalledWith(esperado);
    done();
  });

});
