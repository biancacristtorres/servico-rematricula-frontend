#language: pt

Funcionalidade: Componente onde o aluno consegue informar condições especias para os interesses manifestados

@interesse
Cenário: Aluno que não manifestou interesse, não consegue marcar condições especiais
Dado que sou 'Mateus'
E que estou na tela de Interesse
Quando não marco nenhuma disciplina
Então não consigo solicitar condições especiais

@interesse
Cenário: Aluno que manifesta interesse e solicita condições especiais
Dado que sou 'Mateus'
E que estou na tela de Interesse
Quando marco interesse em Cálculo Diferencial
E marco Turmas Especiais
E submeto o formulário de interesse
Então sou redirecionado para a tela de Aguardando Rematrícula

@interesse
Cenário: Aluno que manifesta interesse e não solicita condições
Dado que sou 'Mateus'
E que estou na tela de Interesse
Quando marco interesse em Cálculo Diferencial
E não marco condições especiais
E submeto o formulário de interesse
Então sou redirecionado para a tela de Aguardando Rematrícula

@interesse
Cenário: Aluno já solicitou condições especiais e entrou novamente na tela
Dado que sou 'Mateus'
E que já solicitei Turmas Especiais
Quando acesso a tela de Interesse
Então a condição Turmas Especiais já está selecionada