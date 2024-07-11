# InfoMed

InfoMed é uma aplicação front-end destinada a pessoas que cuidam de idosos, pessoas que dependem de cuidados médicos frequentes ou que desejam gerenciar os medicamentos que tomam e as consultas médicas agendadas. A aplicação permite adicionar, remover e editar medicamentos, bem como gerenciar a agenda de consultas médicas, com a possibilidade de sincronizar essas informações com o Google Calendar.

## Funcionalidades

- **Gerenciamento de Medicamentos:**
  - Visualizar, adicionar, remover e editar medicamentos.
  - Inserir nome do medicamento, posologia, nome do médico e especialidade.

- **Gerenciamento de Consultas Médicas:**
  - Visualizar, adicionar, remover e editar consultas médicas.
  - Inserir nome do médico, especialidade, data e hora da consulta.

- **Sincronização com Google Calendar:**
  - Sincronize sua agenda de consultas médicas com o Google Calendar para receber notificações e se organizar melhor.

- **Autenticação via Auth0:**
  - Acesso seguro às funcionalidades da aplicação através do Auth0.

## Diagrama

![Diagrama MVP InfoMed ](caminho/para/a/imagem.png)

## Requisitos

- Conta de desenvolvedor no Auth0.
- Conta no Google Cloud para obter a API do Google Calendar.
- Servidor HTTP rodando na porta 8000.

## Instalação

### Front-end

1. Baixe a pasta do repositório do GitHub.
2. Abra a pasta e clique no arquivo `index.html`.
3. O arquivo será aberto no navegador no endereço: `http://localhost:8000`.
4. Para rodar um servidor HTTP na porta 8000, utilize o terminal:

```bash
# Se estiver utilizando Python 3.x
python -m http.server 8000

# Se estiver utilizando Python 2.x
python -m SimpleHTTPServer 8000
```

### Configuração do Auth0

1. Crie uma conta no Auth0 e obtenha suas credenciais.
2. Preencha as credenciais no arquivo `scripts.js`:

```javascript
domain: '[SUBSTITUA PELO DOMÍNIO AUTH0]', // Substituir pelo 'domain' do Auth0
client_id: '[SUBSTITUA PELO CLIENT ID AUTH0]', // Substituir pelo 'client_id' do Auth0
```

### Configuração do Google Calendar API

1. Crie uma conta no Google Cloud e obtenha as credenciais da API do Google Calendar.
2. Preencha as credenciais no arquivo `scripts.js`:

```javascript
client_id: '[SUBSTITUA PELO CLIENT ID DO GOOGLE CALENDAR]', // Substituir pelo 'client_id' da API Google Calendar
```

3. No Auth0 e no Google Cloud, preencha os campos de URLs permitidas com: `http://localhost:8000`.
4. No Google Cloud, insira os IDs (e-mails) de usuários com permissão de acesso (por se tratar de uma aplicação ainda não verificada pelo Google).

### Executando com Docker

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
2. Navegue até o diretório do projeto onde estão localizados os arquivos `Dockerfile` e `docker-compose.yml`.
3. Construa e inicie os containers com o seguinte comando:

```bash
docker-compose up --build
```

4. A aplicação estará disponível em `http://localhost:8000`.

### Rotas da API Google Calendar

- **POST**
  - Inserir Consultas Médicas no Google Calendar.

- **GET**
  - Obter Consultas Médicas sincronizadas com o Google Calendar.

- **DELETE**
  - Excluir Consultas Médicas do Google Calendar.

- **PUT**
  - Editar Consultas Médicas no Google Calendar.

### Back-end

Para acessar a API Rest que gerencia os medicamentos e consultas médicas:

1. Baixe os arquivos correspondentes da API no GitHub.
2. Siga as orientações de instalação fornecidas no repositório da API.
3. A API é desenvolvida em Python utilizando Flask, e utiliza SQLite como banco de dados. Os métodos suportados são: GET, POST, DELETE e PUT.

## Considerações Finais

InfoMed oferece uma maneira conveniente e eficiente de gerenciar medicamentos e consultas médicas, com integração ao Google Calendar e autenticação segura via Auth0. Aproveite todas as funcionalidades e facilite o cuidado com a saúde.

### Versão 1.0.0 (julho de 2024)

- Implementado sistema de gerenciamento de consultas médicas com capacidade de visualização, adição, remoção e edição de consultas.
- Integração com o Google Calendar para sincronização automática de consultas médicas.
- Autenticação segura via Auth0 para acesso às funcionalidades da aplicação.

#### Notas

Esta versão marca o lançamento inicial da aplicação InfoMed, proporcionando uma solução completa para o gerenciamento de medicamentos e consultas médicas, com foco na facilidade de uso e integração com serviços externos como o Google Calendar.

## Autor

Este projeto foi desenvolvido por Rodrigo Procópio e pode ser encontrado no [GitHub](https://github.com/RodrigoProcopio).

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE]() para obter detalhes.