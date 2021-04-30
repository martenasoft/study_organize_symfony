<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210424082427 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('SET sql_mode = "";');

        $this->addSql('CREATE TABLE `group` (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, about LONGTEXT DEFAULT NULL, created_at DATETIME DEFAULT \'0000-00-00 00:00:00\' NOT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE group_user (group_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_A4C98D39FE54D947 (group_id), INDEX IDX_A4C98D39A76ED395 (user_id), PRIMARY KEY(group_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE group_user ADD CONSTRAINT FK_A4C98D39FE54D947 FOREIGN KEY (group_id) REFERENCES `group` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE group_user ADD CONSTRAINT FK_A4C98D39A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE calendar CHANGE created_at created_at DATETIME DEFAULT \'0000-00-00 00:00:00\' NOT NULL');
        $this->addSql('ALTER TABLE calendar_item CHANGE created_at created_at DATETIME DEFAULT \'0000-00-00 00:00:00\' NOT NULL');
        $this->addSql('ALTER TABLE user ADD created_at DATETIME DEFAULT \'0000-00-00 00:00:00\' NOT NULL, ADD updated_at DATETIME DEFAULT NULL, ADD deleted_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE group_user DROP FOREIGN KEY FK_A4C98D39FE54D947');
        $this->addSql('DROP TABLE `group`');
        $this->addSql('DROP TABLE group_user');
        $this->addSql('ALTER TABLE calendar CHANGE created_at created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE calendar_item CHANGE created_at created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE `user` DROP created_at, DROP updated_at, DROP deleted_at');
    }
}
