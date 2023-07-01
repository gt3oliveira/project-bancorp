/*
  Warnings:

  - You are about to drop the column `email` on the `transferencias` table. All the data in the column will be lost.
  - Added the required column `destinatario` to the `transferencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remetente` to the `transferencias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transferencias" DROP COLUMN "email",
ADD COLUMN     "destinatario" TEXT NOT NULL,
ADD COLUMN     "remetente" TEXT NOT NULL;
