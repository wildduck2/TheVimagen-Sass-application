-- CreateTable
CREATE TABLE `User` (
    `id` CHAR(36) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` JSON NULL,
    `lastLoginIp` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `passwordResetToken` VARCHAR(191) NULL,
    `passwordResetTokenExpiration` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OAuthToken` (
    `id` CHAR(36) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `expire_in` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OAuthToken_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailLog` (
    `id` CHAR(36) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `recipient_email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NULL,
    `body` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EmailLog_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` CHAR(36) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `data` JSON NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OAuthToken` ADD CONSTRAINT `OAuthToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailLog` ADD CONSTRAINT `EmailLog_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;