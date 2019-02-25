import { Instituicao } from '@/common/enum/Instituicao';
import { Marca } from '@/model/Marca';

const una = new Marca(
  'UNA',
  'https://aluno.una.br/',
  [
    Instituicao.BomDespacho,
    Instituicao.Catalao,
    Instituicao.Uberlandia,
    Instituicao.UnaBeloHorizonte,
    Instituicao.Betim,
    Instituicao.Contagem,
    Instituicao.Divinopolis,
    Instituicao.NovaSerrana,
    Instituicao.PousoAlegre,
    Instituicao.SeteLagoas,
  ],
);

const uniBH = new Marca(
  'UNIBH',
  'https://aluno.unibh.br/',
  [
    Instituicao.UniBhBeloHorizonte,
  ],
);

const uniSociesc = new Marca(
  'UNISOCIESC',
  'https://aluno.sociesc.com.br/',
  [
    Instituicao.Balneario,
    Instituicao.Blumenau,
    Instituicao.Curitiba,
    Instituicao.Florianopolis,
    Instituicao.Joinville,
    Instituicao.SaoBentoDoSul,
  ],
);

const usjt = new Marca(
  'USJT',
  'https://aluno.usjt.br/',
  [
    Instituicao.Unimonte,
    Instituicao.Ustj,
    Instituicao.EssjGuarulhos,
    Instituicao.FacsjGuarulhos,
    Instituicao.IusjGuarulhos,
    Instituicao.EssjLimeira,
    Instituicao.FacsjLimeira,
    Instituicao.IusjLimeira,
    Instituicao.EssjSaoBernado,
    Instituicao.FacsjSaoBernado,
    Instituicao.IusjSaoBernado,
  ],
);

export const stateDefault: Marca[] = [
  una,
  uniBH,
  uniSociesc,
  usjt,
];
