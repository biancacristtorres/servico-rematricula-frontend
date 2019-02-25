#language: pt

Funcionalidade: Componente onde o aluno consegue informar interesse em alguma disciplina pendente

@interesse
Cenário: Aluno é avisado sobre as regras de interesse ao marcar uma disciplina 
Dado que sou 'Mateus'
E que estou na tela de Interesse
Quando marco interesse em Cálculo Diferencial
Então sou avisado sobre o funcionamento das regras de interesse

@interesse
Cenário: Aluno submete interesse em uma ou mais disciplinas
Dado que sou 'Mateus'
E que estou na tela de Interesse
Quando marco interesse em Cálculo Diferencial
E marco interesse em Desenho Arquitetônico
E submeto o formulário de interesse
Então sou redirecionado para a tela de Aguardando Rematrícula

@interesse
Cenário: Aluno continua sem marcar interesse
Dado que sou 'Mateus'
E que estou na tela de Interesse
Quando não marco nenhuma disciplina
E submeto o formulário de interesse
Então sou redirecionado para a tela de Aguardando Rematrícula

@interesse
Cenário: Aluno já manifestou interesse e entrou novamente na tela
Dado que sou 'Mateus'
E que já manifestei interesse em Resistência dos Materiais
Quando acesso a tela de Interesse
Então a disciplina Resistência dos Materiais já está selecionada