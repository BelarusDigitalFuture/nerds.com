DIR=$(cd `dirname $0` && pwd)
ansible-playbook "$DIR/../playbooks/playbook-deploy.yml" -i "$DIR/../local" --extra-vars "server_env=production"
