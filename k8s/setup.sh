KUBERNETES_DIR="$HOME/Kubernetes"
KUBERNETES_STORAGE="$KUBERNETES_DIR/storage"

# Create kubernetes storage
sudo mkdir -p "$KUBERNETES_DIR"

# Create storage directory for kubernetes apps
sudo mkdir -p "$KUBERNETES_STORAGE"/{fintracker,postgres,pgadmin,grafana,prometheus}

# Create minikube cluster
minikube start --mount --mount-string "$KUBERNETES_STORAGE":/apps --addons ingress,registry,metrics-server,dashboard

# Trust 'mkcert' certificates
sudo mkcert -install

# Generate TLS certificate
sudo mkcert -cert-file "$KUBERNETES_DIR"/cert.pem -key-file "$KUBERNETES_DIR"/cert-key.pem fintracker.com dashboard.minikube.com registry.minikube.com pgadmin.tools.com vault.tools.com grafana.tools.com alert-manager.tools.com localhost 127.0.0.1 ::1

# Add TLS certificates as minikube secret
kubectl -n kube-system create secret tls mkcert --key "$KUBERNETES_DIR"/cert-key.pem --cert "$KUBERNETES_DIR"/cert.pem
minikube addons configure ingress <<< $"kube-system/mkcert\y"

# Add required helm repositories
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add 1password https://1password.github.io/connect-helm-charts

# Wait for kubernetes to init (otherwise 1password ingress fails to install)
sleep 30s

# Install 1password connect and kubernetes operator
op inject -i vault/onepassword_connect-values.yaml.tpl -o values.yaml
helm upgrade -i connect 1password/connect --namespace vault --create-namespace --values values.yaml
rm values.yaml

# Add vault token secret to default namespace
kubectl apply -f vault/vault-token.yaml

# Install postgres
kubectl apply -k ./postgres/
op inject -i postgres/bitnami_postgres-values.yaml.tpl -o values.yaml
helm upgrade -i postgres bitnami/postgresql --values values.yaml
rm values.yaml

# Install pgadmin
kubectl apply -k ./pgadmin/

# Install grafana and prometheus
kubectl create namespace monitoring
kubectl apply -k ./monitoring/
helm upgrade -i grafana bitnami/grafana --namespace monitoring --create-namespace --values monitoring/bitnami_grafana-values.yaml

# Install fintracker
kubectl apply -k ./app/

# Install minikube ingresses
kubectl apply -k ./minikube/
