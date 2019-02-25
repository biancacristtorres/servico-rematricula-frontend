#language: pt

Funcionalidade: Componente onde o aluno consegue visualizar as turmas de cada disciplina para matrícula

Cenário: Aluno consegue visualizar as turmas de uma disciplina
Dado que sou 'João'
E que estou na tela de Alteração
Quando aciono a expansão da disciplina 'Projeto Interdisciplinar 4B'
Então visualizo as turmas da disciplina

Cenário: Aluno consegue visualizar as turmas equivalentes de uma disciplina
Dado que sou 'João'
E que estou na tela de Alteração
Quando aciono a expansão da disciplina 'Fenômenos de Transporte'
Então visualizo as turmas equivalentes da disciplina

Cenário: Aluno consegue visualizar as turmas compostas de uma disciplina
Dado que sou 'João'
E que estou na tela de Alteração
Quando aciono a expansão da disciplina 'Desenho Arquitetônico'
Então visualizo as turmas compostas da disciplina

Cenário: Aluno não visualiza turmas para uma disciplina
Dado que sou 'João'
E que estou na tela de Alteração
Quando aciono a expansão da disciplina 'Geometria Analítica e Álgebra Linear'
Então visualizo a informação de que não existem turmas disponíveis

Cenário: Aluno visualiza uma disciplina eletiva
Dado que sou 'Alessandra'
E que estou na tela de Alteração
Quando aciono a expansão da disciplina 'Eletiva EDF VI'
Então visualizo uma disciplina eletiva na lista de disciplinas equivalentes

@ignore @verificarComoFuncionaAVisualizaçãoDeOptativa
Cenário: Aluno visualiza uma disciplina optativa
Dado que sou 'Alessandra'
E estou na tela de Alteração
Quando aciono a expansão da disciplina ''
Então visualizo uma disciplina optativa na lista de disciplinas equivalentes

Cenário: Aluno aciona a opção 'Ver datas' de uma disciplina na tela de alteração
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Física Termodinâmica, Ótica e Ondas'
Quando aciono a opção 'Ver datas' da turma EME4BN-COA1
Então visualizo uma modal com as datas da aula da disciplina