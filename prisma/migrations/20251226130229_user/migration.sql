-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "system";

-- CreateTable
CREATE TABLE "system"."users_passwords" (
    "_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_passwords_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "system"."users_tokens" (
    "_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT "users_tokens_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "system"."users" (
    "_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "names" VARCHAR(50) NOT NULL,
    "surnames" VARCHAR(50) NOT NULL,
    "birthday" DATE NOT NULL,
    "phone" VARCHAR(25) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "avatar" VARCHAR(255),
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "failed_attempts" SMALLINT DEFAULT 0,
    "lock_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_passwords_user_id_key" ON "system"."users_passwords"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "system"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "system"."users"("email");

-- AddForeignKey
ALTER TABLE "system"."users_passwords" ADD CONSTRAINT "users_passwords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "system"."users"("_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "system"."users_tokens" ADD CONSTRAINT "users_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "system"."users"("_id") ON DELETE RESTRICT ON UPDATE RESTRICT;
