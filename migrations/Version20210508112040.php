<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210508112040 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql('SET sql_mode = "";');
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE daily_checklist ADD calendar_item_id INT NOT NULL');
        $this->addSql('ALTER TABLE daily_checklist ADD CONSTRAINT FK_DD6D743570182999 FOREIGN KEY (calendar_item_id) REFERENCES calendar_item (id)');
        $this->addSql('CREATE INDEX IDX_DD6D743570182999 ON daily_checklist (calendar_item_id)');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('SET sql_mode = "";');
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE daily_checklist DROP FOREIGN KEY FK_DD6D743570182999');
        $this->addSql('DROP INDEX IDX_DD6D743570182999 ON daily_checklist');
        $this->addSql('ALTER TABLE daily_checklist DROP calendar_item_id');
    }
}
