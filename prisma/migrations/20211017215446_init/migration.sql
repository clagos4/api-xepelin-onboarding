-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "internal_code" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "max_api_calls" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankClient" (
    "id" SERIAL NOT NULL,
    "client_id" UUID NOT NULL,
    "bank_id" INTEGER NOT NULL,

    CONSTRAINT "BankClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "bank_id" INTEGER NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BankClient" ADD CONSTRAINT "BankClient_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankClient" ADD CONSTRAINT "BankClient_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
