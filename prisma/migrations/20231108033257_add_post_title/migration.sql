/*
  Warnings:

  - The primary key for the `Listing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `listingId` on the `Favorite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `listingTitle` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_listingId_fkey";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "listingId",
ADD COLUMN     "listingId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_pkey",
ADD COLUMN     "listingTitle" VARCHAR(30) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Listing_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
