fullNameOverride: postgres

auth:
  username: {{ op://local-server-prod/PostgreSQL-FinTracker/username }}
  password: {{ op://local-server-prod/PostgreSQL-FinTracker/password }}
  database: {{ op://local-server-prod/PostgreSQL-FinTracker/database }}

primary:
  service:
    type: NodePort
    nodePorts:
      postgresql: 30001
  persistence:
    existingClaim: postgres-pvc

metrics:
  enabled: true
