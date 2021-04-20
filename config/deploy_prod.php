<?php
use EasyCorp\Bundle\EasyDeployBundle\Deployer\DefaultDeployer;

return new class extends DefaultDeployer
{
    public function configure()
    {
        return $this->getConfigBuilder()
            ->server(' kostiagm@92.205.24.68')
            ->deployDir('/var/www/mso-box.com')
            ->repositoryUrl('git@github.com:martenasoft/study_organize_symfony.git')
            ->repositoryBranch('master')
            ;
    }
};