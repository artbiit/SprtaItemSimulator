-- DropForeignKey
ALTER TABLE `ItemStat` DROP FOREIGN KEY `ItemStat_itemId_fkey`;

-- AddForeignKey
ALTER TABLE `ItemStat` ADD CONSTRAINT `ItemStat_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
