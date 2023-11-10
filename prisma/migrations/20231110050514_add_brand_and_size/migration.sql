/*
  Warnings:

  - Added the required column `brand` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "brand" VARCHAR(30) NOT NULL,
ADD COLUMN     "size" VARCHAR(4) NOT NULL;
