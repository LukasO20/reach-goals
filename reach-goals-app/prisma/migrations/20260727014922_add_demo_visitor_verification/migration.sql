/*
  Warnings:

  - You are about to drop the `DemoVisitorValidation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DemoVisitorValidation";

-- CreateTable
CREATE TABLE "DemoVisitorVerification" (
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoVisitorVerification_pkey" PRIMARY KEY ("email")
);
