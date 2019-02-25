import { ErroFactory } from '../../../factory/components/ErroFactory';
import { Instituicao } from '@/common/enum/Instituicao';

describe('Componente de Erro', () => {
  const erroFactory = new ErroFactory();

  beforeEach(() => {
    erroFactory.dadoQueOAlunoSejaDaInstuicaoUNA();
  });

  it('O título exibido deve ser o título passado por parâmetro', async (done) => {
    erroFactory.dadoOTitulo('XPTO');

    await erroFactory.montarComponente();

    expect(erroFactory.tituloDoErro).toEqual('XPTO');

    done();
  });

  it('O texto exibido deve ser o texto passado por parâmetro', async (done) => {
    erroFactory.dadoOTexto('XPTO');

    await erroFactory.montarComponente();

    expect(erroFactory.TextoDoErro).toEqual('XPTO');

    done();
  });

  it('Caso um nome válido de imagem seja passado por parâmetro a imagem deve ser renderizada', async (done) => {
    erroFactory.dadoAImagem('sistema-indisponivel');

    await erroFactory.montarComponente();

    expect(erroFactory.existeAImagem).toBeTruthy();

    done();
  });

  it('O botão de redirecionamento para o SOL deve aparecer', async (done) => {
    erroFactory.dadoAExibicaoDoBotaoDeRerecionamento(true);

    await erroFactory.montarComponente();

    expect(erroFactory.retornarAoSol.exists()).toBeTruthy();
    done();
  });

  it('O botão de redirecionamento para o SOL não deve aparecer', async (done) => {
    erroFactory.dadoAExibicaoDoBotaoDeRerecionamento(false);

    await erroFactory.montarComponente();

    expect(erroFactory.retornarAoSol.exists()).toBeFalsy();
    done();
  });

  it('Possui um botão para redirecionar para o SOL com uma url dinâmica, com base na instituição', async (done) => {
    erroFactory.dadoAExibicaoDoBotaoDeRerecionamento(true);

    await erroFactory.montarComponente();
    const atual = erroFactory.retornarAoSol.attributes('href');

    const esperado = `https://aluno.una.br/SOL/aluno/index.php/index/seguranca/dev/instituicao/${
      Instituicao.UnaBeloHorizonte
    }`;
    expect(atual).toEqual(esperado);
    done();
  });

  it('Snapshot', async (done) => {
    erroFactory.dadoAExibicaoDoBotaoDeRerecionamento(true);

    await erroFactory.montarComponente();

    expect(erroFactory.componente).toMatchSnapshot();

    done();
  });
});
