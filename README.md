# Api Rest

Estudo sobre REST API.

## Ferramentas
  - VS Code
  - MySQL Workbench

## Tecnologias
  - Node.js
  - JSON Web Tokens.
  - Mysql - MariaDB

## Pré requisitos
  - criar um container docker para o mysql
    - docker run -p 3306:3306 --name mariadb -e MYSQL_ROOT_PASSWORD=root -d mariadb
  - criar uma base de dados com o nome dados, o arquivo modelagem-ecommerce contém a estrutura das tabelas.

## Como testar
  - executar yarn start para rodar o server.
  - testar rotas no insominia, http://localhost:3000, /produtos, /pedidos, /usuarios e /login.

### https://www.youtube.com/playlist?list=PLWgD0gfm500EMEDPyb3Orb28i7HK5_DkR