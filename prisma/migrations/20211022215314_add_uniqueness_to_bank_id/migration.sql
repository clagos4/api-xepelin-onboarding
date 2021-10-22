/*
  Warnings:

  - A unique constraint covering the columns `[bank_id]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bank_bank_id_key" ON "Bank"("bank_id");
