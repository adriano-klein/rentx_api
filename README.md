# Cadastro de carro
**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com status padrão disponível = true
O cadastro de um carro pode ser realizado somente por usuário administrador

# Listagem de carro
**RF**
Deve ser possível listar somente os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**RN**
O usuário não precisa estar logado no sistema.


# Cadastro de especificação do carro
**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro inexistente.
Não deve ser possível cadastar uma especificação já existente para o mesmo carro.
O cadastro pode ser realizado somente por usuário administrador.


# Cadastro de imagens do carro
**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder mais de uma imagem para o mesmo carro.
O cadastro de imagens deve ser feito somente por usuário administrador.


# Aluguel de carro
**RF**
Deve ser possível cadastrar um novo aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

# Recuperação de senha
**RF**
- Deve ser possível o usuário recuperar a senha informando o email
- O usuário deve receber um email com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisar informar uma nova senha
- O link enviado para recuperação de senha deve expirar em 3 horas