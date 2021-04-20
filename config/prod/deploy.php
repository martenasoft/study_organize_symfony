<?php

use EasyCorp\Bundle\EasyDeployBundle\Deployer\DefaultDeployer;

return new class extends DefaultDeployer {
    // private $remoteComposerBinaryPath = '/usr/bin/composer';
    public function configure()
    {
        return $this->getConfigBuilder()
            ->remoteComposerBinaryPath('/usr/bin/composer')
            // SSH connection string to connect to the remote server (format: user@host-or-IP:port-number)
            ->server(' kostiagm@92.205.24.68')
            // the absolute path of the remote server directory where the project is deployed
            ->deployDir('/var/www/mso-box.com')
            // the URL of the Git repository where the project code is hosted
            ->repositoryUrl('git@github.com:martenasoft/study_organize_symfony.git')
            // the repository branch to deploy
            ->repositoryBranch('master');
    }

    public function beforePreparing()
    {
        $this->runRemote('cp {{ deploy_dir }}/repo/.env {{ project_dir }}/.env');
        $this->runRemote('composer install --no-progress');
        $this->runRemote('echo "=========| RUN DEPLOY |===================="');
        $this->runRemote('echo "php {{ deploy_dir }}/repo/bin/console doctrine:migrations:migrate --no-interaction --env=prod"');
        $this->runRemote('php {{ deploy_dir }}/repo/bin/console doctrine:migrations:migrate --no-interaction --env=prod');
        $this->runRemote('php {{ deploy_dir }}/repo/bin/console cache:clear --env=prod');
        $this->runRemote('php {{ deploy_dir }}/repo/bin/console doctrine:cache:clear-metadata --env=prod');
        $this->runRemote('php {{ deploy_dir }}/repo/bin/console doctrine:cache:clear-query --env=prod');
        $this->runRemote('php {{ deploy_dir }}/repo/bin/console doctrine:cache:clear-result --env=prod');

        //   $this->runRemote('cp {{ deploy_dir }}/repo/.env.local {{ project_dir }}/.env.local');
    }

    // run some local or remote commands after the deployment is finished
    public function beforeFinishingDeploy()
    {
        $this->runRemote('cp {{ deploy_dir }}/repo/.env {{ deploy_dir }}/.env');
        // $this->runRemote('{{ console_bin }} app:my-task-name');
        // $this->runLocal('say "The deployment has finished."');
    }
};
