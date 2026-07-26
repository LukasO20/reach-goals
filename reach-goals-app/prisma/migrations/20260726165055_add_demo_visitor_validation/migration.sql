-- CreateTable
CREATE TABLE "DemoVisitorValidation" (
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoVisitorValidation_pkey" PRIMARY KEY ("email")
);
