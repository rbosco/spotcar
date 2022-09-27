<h1 align="center">
    <p align="center">
      <img alt="logo" src="./readme/spotcar.png" width="400px">
    </p>
    ⚙️ <a href="#" alt=""> SpotCar </a>
</h1>

<h3 align="center">
    ⚙️ Gerencie estacionamentos integrando com a SpotCar. 👨‍💼
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rbosco/spotcar?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/rbosco/spotcar">
  
  <a href="https://github.com/rbosco/spotcar/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rbosco/spotcar">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/rbosco/spotcar/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rbosco/spotcar?style=social">
  </a>
</p>

Tabela de conteúdos
=================

   * [Sobre o projeto](#sobre-o-projeto)
   * [Funcionalidades](#funcionalidades)
   * [Swagger](#swagger)
   * [Como executar o projeto](#como-executar-o-projeto)
     * [Pré-requisitos](#pre-requisitos)
     * [Rodando o servidor](#rodando-o-backend)
     * [Rodando os testes](#rodando-testes)
   * [Tecnologias](#tecnologias)
     * [Server](#tecnologias-server)
     * [Utilitários](#utilitarios)
   * [Autor](#autor)
   * [Licença](#licenca)



## 💻 Sobre o projeto <a name="sobre-o-projeto"></a>

⚙️ O SpotCar fornece API's para gestão de estacionamentos.

---

## ⚙️ Funcionalidades <a name="funcionalidades"></a>

- [x] O seu sistema pode se integrar a SpotCar para:
  - [x] Cadastrar estabelecimento.
  - [x] Relatórios com a visão do dono.
  - [x] Gerenciar veículos.
  - [x] Controle de entrada e saída de veículos.

---

## 🎨 Swagger <a name="Swagger"></a>

Acesse o Swagger para ver a documentação das API's da SpotCar.

<a href="https://www.figma.com/file/8szO6rJwdHlSaF95n2vKgW/GoBarber">
  <img alt="Acessar Swagger" src="https://img.shields.io/badge/Acessar%20API%20-Swagger-%2304D361">
</a>

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="Screenshot swagger 1" src="./readme/screen_spotcar.png" width="800px">
</p>

---

## 🚀 Como executar o projeto <a name="como-executar-o-projeto"></a>

💡 Para visualizar o funcionamento das API's do SpotCar é necessário que o Backend esteja sendo executado para funcionar

### Pré-requisitos <a name="pre-requisitos"></a>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Nodejs](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

#### 🎲 Rodando o Backend <a name="rodando-o-backend"></a>

```bash

# Clone este repositório
$ git clone https://github.com/rbosco/spotcar.git

# Acesse a pasta do projeto no terminal/cmd
$ cd spotcar

# Execute o docker-compose build
$ docker-compose up --build

# O servidor inciará na porta:3000 - acesse http://localhost:3000/api 

```

#### 🎲 Rodando os testes <a name="rodando-testes"></a>

```bash

#Execute os testes
$ npm run test

```

#### 🎲 Acessando o Swagger <a name="acessando-swagger"></a>

O Swagger será executado na rota /api - acesse (http://localhost:3000/api)

---

## 🛠 Tecnologias <a name="tecnologias"></a>

As seguintes ferramentas foram usadas na construção do projeto:

-   **[EditorConfig](https://editorconfig.org/)**

#### **Server** ([Nodejs 14](https://nodejs.org/en/)) <a name="tecnologias-server"></a>

-   **[NestJS](https://nestjs.com/)**
-   **[TypeORM](https://typeorm.io/)**
-   **[Mysql](https://www.mysql.com/)**
-   **[Swagger](https://laravel.com/)**

> Veja o arquivo  [package.json](https://github.com/rbosco/spotcar/blob/main/package.json)

#### **Utilitários** <a name="utilitarios"></a>

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Teste de API:  **[Insomnia](https://insomnia.rest/)**

---

## 🦸 Autor <a name="autor"></a>

<a href="https://github.com/rbosco">
 <img src="https://avatars2.githubusercontent.com/u/6660950?s=460&u=ac94c8da0e69db2558f031d01dbca5c60aa19b77&v=4" width="100px" alt="Rômulo Basilio Bosco" />
 <br />
 <sub><b>Rômulo Basilio Bosco</b></sub></a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-RomuloBosco-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/romulobbosco/)](https://www.linkedin.com/in/romulobbosco/) 
[![Gmail Badge](https://img.shields.io/badge/-romulo.bbosco@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:romulo.bbosco@gmail.com)](mailto:romulo.bbosco@gmail.com)

---

## 📝 Licença <a name="licenca"></a>

Este projeto esta sob a licença [MIT](./LICENSE).

Feito com ❤️ por Rômulo Basilio Bosco 👋🏽 [Entre em contato!](https://www.linkedin.com/in/romulobbosco/)