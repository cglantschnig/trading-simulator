-- CreateTable
CREATE TABLE "AssetValue" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AssetValue_pkey" PRIMARY KEY ("id")
);
