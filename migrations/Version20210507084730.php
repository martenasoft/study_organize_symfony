<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210507084730 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql('SET sql_mode = "";');

        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE daily_checklist (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, datatype SMALLINT NOT NULL, datetime INT NOT NULL, record_id INT NOT NULL, status SMALLINT NOT NULL, INDEX IDX_DD6D7435A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE daily_checklist ADD CONSTRAINT FK_DD6D7435A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('SET sql_mode = "";');

        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE daily_checklist');
    }
}
