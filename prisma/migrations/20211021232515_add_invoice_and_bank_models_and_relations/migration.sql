/*
  Warnings:

  - You are about to drop the column `currency` on the `Client` table. All the data in the column will be lost.
  - Added the required column `currency_id` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "currency",
ADD COLUMN     "currency_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Invoice" (
    "invoice_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "invoice_number" VARCHAR(50) NOT NULL,
    "invoice_date" DATE NOT NULL,
    "invoice_total" DOUBLE PRECISION NOT NULL,
    "payment_total" DOUBLE PRECISION NOT NULL,
    "credit_total" DOUBLE PRECISION NOT NULL,
    "bank_id" INTEGER NOT NULL,
    "invoice_due_date" DATE NOT NULL,
    "payment_date" DATE NOT NULL,
    "currency_id" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(5) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoice_id_key" ON "Invoice"("invoice_id");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
