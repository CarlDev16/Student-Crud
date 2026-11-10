-- =============================================================================
-- Schema initialization for Student entity
-- Compatible with Hibernate 6 globally_quoted_identifiers=true on PostgreSQL
-- Uses IF NOT EXISTS to prevent altering or deleting existing production data
-- =============================================================================

CREATE SEQUENCE IF NOT EXISTS "Student_SEQ" START WITH 1 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS "Student" (
    "id" INTEGER NOT NULL,
    "course" VARCHAR(255),
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "section" VARCHAR(255),
    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
