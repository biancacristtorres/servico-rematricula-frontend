#language: pt
@ignore @erroNoPassoDeVisualizacaoDoAlerta
Funcionalidade: Aluno realiza a escolha de uma turma que possui conflito de horário

Cenário: Aluno troca a turma de uma disciplina confirmada e recebe alerta de conflito de horário
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Projeto Interdisciplinar 4B'
Quando seleciono a turma EPR4BN-COA1
Então visualizo um alerta de choque de horário
E visualizo a marcação retornando para a turma confirmada da disciplina

Cenário: Aluno escolhe uma turma de uma disciplina disponível e recebe alerta de conflito de horário
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Equações Diferenciais'
Quando seleciono a turma EME4BN-COA
Então visualizo um alerta de choque de horário
E visualizo a marcação retornando para Nenhuma das opções da disciplina

Cenário: Aluno escolhe remover uma disciplina confirmada e recebe uma mensagem de erro
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Desenho Arquitetônico'
Quando seleciono a opção Nenhuma das opções
Então visualizo uma mensagem de erro
E visualizo a marcação retornando para a turma confirmada da disciplina