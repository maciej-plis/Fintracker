fullNameOverride: postgres

auth:
  username: {{ op://local-server/postgreSQL/username }}
  password: {{ op://local-server/postgreSQL/password }}
  database: {{ op://local-server/postgreSQL/database }}

primary:
  service.type: NodePort
  persistence:
    existingClaim: postgres-pvc

metrics:
  enabled: true