ALTER TABLE "BlogPost"
ADD COLUMN "authorId" TEXT;

ALTER TABLE "BlogPost"
ADD CONSTRAINT "BlogPost_authorId_fkey"
FOREIGN KEY ("authorId")
REFERENCES "User"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;

CREATE INDEX "BlogPost_authorId_idx"
ON "BlogPost"("authorId");