-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TEXT,
    "deathDate" TEXT,
    "biography" TEXT,
    "photo" TEXT,
    "fatherId" INTEGER,
    "motherId" INTEGER,
    "posX" REAL NOT NULL DEFAULT 0,
    "posY" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Person" ("biography", "birthDate", "createdAt", "deathDate", "fatherId", "firstName", "id", "lastName", "motherId", "photo") SELECT "biography", "birthDate", "createdAt", "deathDate", "fatherId", "firstName", "id", "lastName", "motherId", "photo" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
