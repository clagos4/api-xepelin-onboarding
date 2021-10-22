# api-xepelin
API desarrollada para proceso de onboarding en Xepelin

# Requisitos
* [PostgreSQL](https://github.com/IIC2513-2017-2/syllabus/wiki/Getting-Started#postgresql)
  * you will need a database with name and user/password as configured in `src/config/database.js`
* [Node.js v12.6.0 o más](https://www.freecodecamp.org/news/how-to-install-node-js-on-ubuntu-and-update-npm-to-the-latest-version/) 
* [Yarn](https://yarnpkg.com)

## Setup

* Clone repository
* Instalar dependencias:
  * `npm install`

## Database Setup (development)

### Init Prisma
`npx prisma init`

### Install postgresql
* On Ubuntu: `sudo apt install postgresql postgresql-contrib`

### Enter to postgres console
```sh
sudo su - postgres
```

### Create development database

```sh
createdb xepelin
```

### Create user
```sh
createuser --interactive --pwprompt
```
Then complete the username and password information. At the end, approve superuser role option.
After that enter to .env and replace the user, password and database info in the link.

### Exit Postgresql command prompt and restart service
Insert commands
```sh
exit
sudo systemctl restart postgresql
```

### Run migrations
```sh
npx prisma generate

npx prisma migrate dev
```

## Corregir
Hacer for para conseguir diccionario en users.ts patch

### Correr Docker
```sh
sudo docker-compose up -d
```

Si hay problemas con el puerto 5432, correr ```sudo kill -9 `sudo lsof -t -i:5432```
