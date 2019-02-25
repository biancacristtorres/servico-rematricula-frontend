#language: pt

Funcionalidade: Aluno consegue realizar a escolha da disciplina e turma que irá cursar

Cenário: Aluno escolhe uma turma de uma disciplina não confirmada
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Física Termodinâmica, Ótica e Ondas'
Quando seleciono a turma EME4BN-COA1
Então visualizo a marcação na turma selecionada

Cenário: Aluno escolhe uma turma de uma disciplina já confirmada
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Laboratório de Aprendizagem Integrada 2A'
Quando seleciono a turma ECV1BN-COA1
Então visualizo a marcação da turma equivalente selecionada

Cenário: Aluno escolhe remover uma disciplina confirmada
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Geologia'
Quando seleciono a opção Nenhuma das opções
Então visualizo a marcação de Nenhuma das opções