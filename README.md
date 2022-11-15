# ⚽ Trybe Futebol Clube ⚽

# Sobre
Esse projeto foi feito na Trybe. Uma Api REST, com ela da para criar times, partidas, fazer login. E  foi utilizada principios SOLID e programação orientada a Objeto (POO)

O FrontEnd foi disponibilizado pela a Trybe 

## Técnologias usadas

Front-end:
> Desenvolvido usando: React, CSS3, HTML5, ES6

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MYSQL, ES6, Sequelize, TypeScript

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/2f1a5c4d-74b1-488a-8d9b-408682c93724/lesson/b883b81d-21f6-4b60-aa62-8508f6017ea0);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>

## Clone o repositório:

```
git clone git@github.com:igors-vieira/Projeto-Trybe-Futebol-Clube.git
cd Projeto-Trybe-Futebol-Clube/
```

## Instalando Dependências

<details>
  <summary><strong>🐋 Instalando com Docker</strong></summary>
  
  <br/>

  > :information_source: Rode os serviços com o comando
  ```bash 
  npm run compose:up
  ```
  > :information_source: para derrubar a aplicação
  ```bash 
  npm run compose:down
  ```
</details>

## Acessando aplicação

> :information_source: A aplicação vai ta rodando em http://localhost:3000/login

> voce pode acessar com esse login

```
login: admin@admin.com
senha: secret_admin
```

## Executando Testes

* Para rodar todos os testes:

  ```
    cd ./app/backend/ && npm install && npm run test:coverage
  ```
