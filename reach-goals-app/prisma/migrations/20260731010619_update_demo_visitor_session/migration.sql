/*
  Warnings:

  - A unique constraint covering the columns `[demoVisitorId]` on the table `DemoVisitorSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DemoVisitorSession_demoVisitorId_key" ON "DemoVisitorSession"("demoVisitorId");
