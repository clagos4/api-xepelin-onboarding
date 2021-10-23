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
* Installl dependencies:
  * `npm install`

### Database Setup (development)

#### Install postgresql
* On Ubuntu: `sudo apt install postgresql postgresql-contrib`

#### Enter to postgres console
```sh
sudo su - postgres
```

#### Create development database

```sh
createdb xepelin
```

#### Create user
```sh
createuser --interactive --pwprompt
```
Then complete the username and password information. At the end, approve superuser role option.
After that enter to .env and replace the user, password and database info in the link.

#### Exit Postgresql command prompt and restart service
Insert commands
```sh
exit
sudo systemctl restart postgresql
```

### Dotenv
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

### Start Application
To start de app run `npm start`


### Troubleshooter
* If you encounter any problem trying to open the 5432 port, run ```sudo kill -9 `sudo lsof -t -i:5432```

## Descripción técnica
El sistema se diseño de manera de abstraer cada concepto que interactúa en la situación mencionada en el ejercicio.
Bajo esta lógica, es que separamos en instancias distintas a los clientes, los invoices, los tipos de monedas y las cuentas de banco.
Además, la relación entre bancos y clientes se almacena en una tabla aparte (BankClient).

El diseño E-R del programa se puede ver en el siguiente diagrama:


Por otro lado, para poder interactuar con el diseño, se desarrollaron las siguientes rutas en la API:
Clientes:
  * GET localhost:3200/api/v1/clients/
    Entrega lista de los clientes
  * PATCH localhost:3200/api/v1/clients/:id
    Permite editar al cliente con el id entregado en los parámetros de la request. Permite editar los campos tax_id y currency_id.
  * POST localhost:3200/api/v1/clients/create:
    Permite crear un usuario. Debe recibir los siguientes atributos encriptados en json en el body de la request: 
      * name: String. Nombre del cliente.
      * internal_code: Int. Codigo interno del cliente.
      * tax_id: Int. Cuenta de impuestos del cliente.
      * currency: String. Nombre de el tipo de moneda a usar. Puede ser CLP, USD o EUR.
      * max_api_calls: Int. Cantidad de llamados mensuales que puede hacer el usuario a la API.
      * banks: Array(Int). Lista con cuentas de banco.
  * DELETE localhost:3200/api/v1/clients/:id
    Permite eliminar a un cliente de la base de datos. Recibe el id mediante los parámetros de la request.

Invoices
  * GET localhost:3200/api/v1/invoices/:vendor?/:invoiceDate?/:currency?
    Permite obtener la lista de las facturas. Además permite filtrar por id de vendedor o fecha de la factura. Además, permite agregar una moneda para recibir los valores expresados en la moneda referida en el parámetro.
  * CREATE localhost:3200/api/v1/invoices/create
    Permite ingresar en el sistema una factura nueva
    * invoice_id: Int. Id de la factura.
    * vendor_id: Int. Id del vendedor.
    * invoice_number: String. Número de factura.
    * invoice_date: String. Fecha de la factura.
    * invoice_total: Float. Total de la factura.
    * payment_total: Float. Total de la factura que fue pagado.
    * credit_total: Float. Total de la factura que fue prestado.
    * bank_id: Int. Id del banco.
    * invoice_due_date: String. Fecha de vencimiento de la factura.
    * payment_date: String. Fecha de pago de la factura.
    * currency: String. Nombre de el tipo de moneda a usar. Puede ser CLP, USD o EUR.

Currency
  * GET localhost:3200/api/v1/currencies/
    Permite obtener una lista de los tipos de moneda
  * POST localhost:3200/api/v1/currencies/create
    Permite crear un tipo de moneda nuevo. Recibe el siguiente atributo mediante el body de la request:
    * name: String. El nombre del tipo de moneda.
  }

### Supuestos
* El filtro de la fecha de la factura para la llamada GET de invoices, mostraba la fecha mínima en que pudo haberse creado la factura.

### Aspectos por mejorar de la entrega
  * Manejo de sesiones de los usuarios
  * Conversión de las facturas al valor default del usuario
  * Usar Docker para correr el sistema
  * Aumentar los validadores de las llamadas
  * Mejorar el trato de errores de la API

