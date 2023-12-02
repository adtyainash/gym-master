-- CreateTable
CREATE TABLE "gymClass" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "instructorName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "quota" INTEGER NOT NULL,
    "instructorId" INTEGER NOT NULL,

    CONSTRAINT "gymClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER,
    "gymClassId" INTEGER,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,

    CONSTRAINT "instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "membershipStatus" BOOLEAN NOT NULL DEFAULT false,
    "membershipDuration" INTEGER NOT NULL DEFAULT 0,
    "role" TEXT NOT NULL DEFAULT 'Customer',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership" (
    "membershipId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "membership_pkey" PRIMARY KEY ("membershipId")
);

-- CreateTable
CREATE TABLE "purchase" (
    "purchaseId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("purchaseId")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipment_name_key" ON "equipment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "gymClass" ADD CONSTRAINT "gymClass_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_gymClassId_fkey" FOREIGN KEY ("gymClassId") REFERENCES "gymClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "membership"("membershipId") ON DELETE RESTRICT ON UPDATE CASCADE;
