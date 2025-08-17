# Task Manager FrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Development 

- Sobre o projeto devido ao pouco tempo, não conseguir fazer docker espercifico para deploy. Mas minhas considereções sobre o projeto, conseguir usar gerência de estado utliizando behavior subject, era algo que queria testar e o projeto encaixou bem, outro ponto foi a autenticação jwt. tratei um caso interressante, onde normalmente só verificamos se existe o token, mas não há verificação de validade. dessa forma alguem poder seta key do tokem no localstorage qual valor qualquer e o guard tomava como valido. Pensando nisso, crie o event para monitorar alteração no key do tokem caso alguem alteraçe faria uma chamada a uma rota protegida que a validação do token. Fiz paginação e filtros, usei recurso angular CDK para criar modal, porêm o que eu queria usar era cdk drag in drop, mas simplicidade e tempo deixadando para depois. mas o projeto em si foi boa experiência.  



## ✅ Pré-requisitos

* Node.js
* Angular v!7 CLI
* Git instalado

<h1 align="center">
    <strong> Projeto</strong>
</h1>

<p align="center">
    <apan align="center">
      <img alt="desktop" src="src/assets/login.png" height="80%" width="64%">
    </apan>
</p>

<p align="center">
    <apan align="center">
      <img alt="desktop" src="src/assets/profile.png" height="80%" width="64%">
    </apan>
</p>

<p align="center">
    <apan align="center">
      <img alt="desktop" src="src/assets/list.png" height="80%" width="64%">
    </apan>
</p>

<p align="center">
    <apan align="center">
      <img alt="desktop" src="src/assets/new.png" height="80%" width="64%">
    </apan>
</p>



Clone este repositório usando o comando:

```bash
git clone https://github.com/erikbernard/task-manager-front-end
```
Acesse a pasta `task-manager`:
```bash
cd task-manager

```
npm run install
```
```
npm run start
```
E acesse a pagina `http://localhost:4200/`. Certifique que o backend estaja rodando na porta 3333

