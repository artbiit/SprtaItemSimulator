-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `isEquippable` BOOLEAN NOT NULL,
    `maxStack` INTEGER NOT NULL,
    `rarity` ENUM('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY') NOT NULL,
    `equippedByCharacterId` INTEGER NULL,
    `inventoryOfCharacterId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `healthBonus` INTEGER NULL,
    `attackBonus` INTEGER NULL,
    `defenseBonus` INTEGER NULL,
    `critChanceBonus` DOUBLE NULL,
    `critMultiplierBonus` DOUBLE NULL,
    `evasionBonus` DOUBLE NULL,
    `accuracyBonus` DOUBLE NULL,
    `itemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `selectedCharacterId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `health` INTEGER NOT NULL,
    `attackPower` INTEGER NOT NULL,
    `defense` INTEGER NOT NULL,
    `critChance` DOUBLE NOT NULL,
    `critMultiplier` DOUBLE NOT NULL,
    `evasion` DOUBLE NOT NULL,
    `accuracy` DOUBLE NOT NULL,
    `expGainRate` DOUBLE NOT NULL,
    `goldGainRate` DOUBLE NOT NULL,
    `ownerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_equippedByCharacterId_fkey` FOREIGN KEY (`equippedByCharacterId`) REFERENCES `Character`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_inventoryOfCharacterId_fkey` FOREIGN KEY (`inventoryOfCharacterId`) REFERENCES `Character`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemStat` ADD CONSTRAINT `ItemStat_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
