#language: pt

Funcionalidade: Avaliação do sistema de rematrícula, onde o aluno escolhe uma nota e faz comentários a respeito

Cenário: Aluno acessa a modal de avaliação da rematrícula
Dado que sou 'João'
E que estou na tela de Resumo
Quando aciono o botão Avalie Sua Rematrícula
Então visualizo uma modal com a avaliação da rematrícula

Cenário: Aluno realiza a avaliação da sua rematrícula
Dado que sou 'João'
E que estou na tela de Resumo
E que acessei a Avaliação de Rematrícula
Quando preencho as informações de avaliação
E aciono o botão Enviar
Então visualizo a mensagem de sucesso de envio da avaliação