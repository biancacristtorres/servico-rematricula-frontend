import { Marca } from '@/model/Marca';
import { Instituicao } from '@/common/enum/Instituicao';

describe('Model de marca', () => {

  it('Retorna verdadeiro quando possui uma determinada instuicao', async (done) => {
    const instituicoes = [ Instituicao.BomDespacho, Instituicao.Catalao ];
    const marca = new Marca('UNA', 'http://sol.com.br', instituicoes);

    const atual = marca.possuiInstituicao(Instituicao.BomDespacho);

    expect(atual).toBeTruthy();
    done();
  });

  it('Retorna falso quando não possui uma determinada instituicao', async (done) => {
    const instituicoes = [ Instituicao.BomDespacho, Instituicao.Catalao ];
    const marca = new Marca('UNA', 'http://sol.com.br', instituicoes);

    const atual = marca.possuiInstituicao(Instituicao.Betim);

    expect(atual).toBeFalsy();
    done();
  });

});
