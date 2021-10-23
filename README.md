# api-xepelin
API desarrollada para proceso de onboarding en Xepelin

## Setup

* Clone repository
* Install nodejs and npm
  ```sh
  sudo apt install curl
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  nvm install 14.4
  sudo apt install npm
  ```
* Instalar dependencias:
  * `npm install`

## Database Setup (development)

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

## Dotenv
* Create a .env file in your root directory
* Complete with the following format
```
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=mySchema
POSTGRES_USER=myUsername
POSTGRES_PASSWORD=mySecretPassword
POSTGRES_DB=myDatabaseName

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}"

INVOICES_URL=https://gist.githubusercontent.com/rogelio-meza-t/f70a484ec20b8ea43c67f95a58597c29/raw/41f289c605718e923fc1fad0539530e4d0413a90/invoices.csv

CURRENCY_API_URL=https://free.currencyconverterapi.com/
CURRENCY_API_TOKEN=fdpoisajfio
```

### Run migrations
```sh
npx prisma generate

npx prisma migrate dev
```


## Troubleshooter
* Si hay problemas con el puerto 5432, correr ```sudo kill -9 `sudo lsof -t -i:5432```
