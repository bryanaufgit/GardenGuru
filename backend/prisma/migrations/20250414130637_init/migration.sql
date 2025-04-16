-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latinName" TEXT NOT NULL,
    "light" TEXT NOT NULL,
    "water" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);
