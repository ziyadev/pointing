-- CreateTable
CREATE TABLE "AttendancesDuration" (
    "id" SERIAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "checkInId" INTEGER NOT NULL,
    "checkOutId" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttendancesDuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttendancesDuration_checkInId_key" ON "AttendancesDuration"("checkInId");

-- CreateIndex
CREATE UNIQUE INDEX "AttendancesDuration_checkOutId_key" ON "AttendancesDuration"("checkOutId");

-- CreateIndex
CREATE INDEX "AttendancesDuration_employeeId_idx" ON "AttendancesDuration"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "AttendancesDuration_checkInId_checkOutId_key" ON "AttendancesDuration"("checkInId", "checkOutId");

-- CreateIndex
CREATE INDEX "Attendances_employeeId_idx" ON "Attendances"("employeeId");

-- AddForeignKey
ALTER TABLE "AttendancesDuration" ADD CONSTRAINT "AttendancesDuration_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
