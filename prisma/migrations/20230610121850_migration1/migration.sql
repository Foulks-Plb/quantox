/*
  Warnings:

  - You are about to drop the column `PriceA` on the `Pool` table. All the data in the column will be lost.
  - You are about to drop the column `PriceB` on the `Pool` table. All the data in the column will be lost.
  - Added the required column `priceA` to the `Pool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceB` to the `Pool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pool" DROP COLUMN "PriceA",
DROP COLUMN "PriceB",
ADD COLUMN     "priceA" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceB" DOUBLE PRECISION NOT NULL;
