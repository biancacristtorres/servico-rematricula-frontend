#language: pt

Funcionalidade: Aluno realiza alteração das suas disciplinas na sua matrícula

Cenário: Aluno aciona o botão de Salvar Alterações e é redirecionado para a tela de Resumo
Dado que sou 'João'
E que estou na tela de Alteração
Quando aciono o botão Salvar Alterações
Então confirmo a mensagem de alterações solicitadas
E sou redirecionado para a tela de Resumo
