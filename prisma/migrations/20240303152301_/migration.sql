-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'off',

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
