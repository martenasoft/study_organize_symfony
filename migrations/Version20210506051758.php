<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210506051758 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql('SET sql_mode = "";');
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE calendar_item ADD replace_type SMALLINT DEFAULT 0 NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('SET sql_mode = "";');
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE calendar_item DROP replace_type');
    }
}
