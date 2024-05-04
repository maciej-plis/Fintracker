connect:
  create: true
  credentials: |
    {{ op://local-server/connect-credentials/1password-credentials.json }}
  ingress:
    enabled: true
    hosts:
      - host: "vault.tools.com"

operator:
  create: true
  token:
    value: {{ op://local-server/connect-token/credential }}
