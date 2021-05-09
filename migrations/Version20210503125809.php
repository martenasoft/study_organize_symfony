<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210503125809 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql('SET sql_mode = "";');
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE calendar_item_checklist_tags (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, calendar_item_id INT NOT NULL, tag VARCHAR(255) NOT NULL, INDEX IDX_679EE5DEA76ED395 (user_id), INDEX IDX_679EE5DE70182999 (calendar_item_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE calendar_item_checklist_tags ADD CONSTRAINT FK_679EE5DEA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE calendar_item_checklist_tags ADD CONSTRAINT FK_679EE5DE70182999 FOREIGN KEY (calendar_item_id) REFERENCES calendar_item (id)');
        $this->addSql('ALTER TABLE calendar CHANGE created_at created_at DATETIME DEFAULT \'0000-00-00 00:00:00\' NOT NULL, CHANGE status status SMALLINT NOT NULL');
        $this->addSql('ALTER TABLE calendar_item ADD tags_count INT DEFAULT 0 NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('SET sql_mode = "";');
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE calendar_item_checklist_tags');
        $this->addSql('ALTER TABLE calendar CHANGE status status INT DEFAULT NULL, CHANGE created_at created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE calendar_item DROP tags_count');
    }
}
