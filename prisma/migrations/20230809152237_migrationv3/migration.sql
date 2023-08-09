-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "token" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "locationBlockchain" TEXT,
    "locationApp" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "tokenId" TEXT,
    "token" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "locationBlockchain" TEXT,
    "locationApp" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pool" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "tokenA" TEXT NOT NULL,
    "amountA" DOUBLE PRECISION NOT NULL,
    "priceA" DOUBLE PRECISION NOT NULL,
    "tokenB" TEXT NOT NULL,
    "amountB" DOUBLE PRECISION NOT NULL,
    "priceB" DOUBLE PRECISION NOT NULL,
    "locationBlockchain" TEXT,
    "locationApp" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "action" TEXT NOT NULL,
    "tokenFrom" TEXT NOT NULL,
    "amountFrom" DOUBLE PRECISION NOT NULL,
    "locationBlockchainFrom" TEXT,
    "locationAppFrom" TEXT NOT NULL,
    "locationTypeFrom" TEXT NOT NULL,
    "tokenTo" TEXT NOT NULL,
    "amountTo" DOUBLE PRECISION NOT NULL,
    "locationBlockchainTo" TEXT,
    "locationAppTo" TEXT NOT NULL,
    "locationTypeTo" TEXT NOT NULL,
    "process_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_locationBlockchain_locationApp_locationType_token_aut_key" ON "Token"("locationBlockchain", "locationApp", "locationType", "token", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_locationBlockchain_locationApp_locationType_token_au_key" ON "Reward"("locationBlockchain", "locationApp", "locationType", "token", "authorId", "tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_locationBlockchain_locationApp_locationType_tokenA_tok_key" ON "Pool"("locationBlockchain", "locationApp", "locationType", "tokenA", "tokenB", "authorId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pool" ADD CONSTRAINT "Pool_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
