<p align="center">
  <img src="public/logo.svg" width="200" alt="LibreDB Studio Logo" />
</p>

<h1 align="center">LibreDB Studio (RicardTech Edition)</h1>

<p align="center">
  <strong>O editor visual e gerenciador de bancos de dados universal que roda ao lado dos seus dados.</strong>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.4.4-black?logo=next.js" alt="Next.js 16.4.4"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.3.1-61DAFB?logo=react" alt="React 19.3.1"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-26.13.0-339933?logo=node.js" alt="Node.js 26.13.0"></a>
  <a href="https://hub.docker.com/"><img src="https://img.shields.io/badge/Docker-Hub-2496ED?logo=docker" alt="Docker Hub"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>

<p align="center">
  <b>Português (Brasil)</b> ·
  <a href="README_en.md">English</a> ·
  <a href="CHANGELOG.md">Registro de Alterações</a>
</p>

---

## 🌟 O Que Há de Novo Nesta Versão (v2.0.0-ricardtech)

Esta edição foi aprimorada com as funcionalidades mais produtivas do **DbGate**, unindo o design escuro moderno e monitoramento em tempo real do LibreDB com a facilidade no-code do DbGate:

1. **⚡ Truncamento de Tabela com 1 Clique (Truncate Table):**
   * Botão direto no menu de contexto das tabelas (`ObjectTree`) sem precisar escrever queries manuais.
   * Modal de confirmação com alerta visual forte (`destructive`), exibição do nome da tabela e prévia exata do SQL.
   * Suporte nativo a `CASCADE` no PostgreSQL para limpar tabelas com relacionamentos e chaves estrangeiras.
   * Dialeto inteligente: gera `TRUNCATE TABLE` para PostgreSQL, MySQL, MariaDB, Oracle e SQL Server; `DELETE FROM` para SQLite; e `deleteMany` para coleções MongoDB.

2. **📊 Visualização Imediata de Dados ("Ver Dados da Tabela"):**
   * Ação rápida no menu da tabela que abre a grade paginada (100 registros) em um clique.

3. **✏️ Edição Direta de Células (Inline Edit) Ativa por Padrão:**
   * Dê duplo clique em qualquer célula de tabela SQL (PostgreSQL, MySQL, SQLite, etc.) para alterar o valor.
   * Barra inferior destacada com botões claros **[Salvar]** (verde) e **[Descartar]** (vermelho).

4. **🇧🇷 Suporte Nativo a Português do Brasil (pt-BR):**
   * Sistema de internacionalização completo com seletor de idiomas (`LanguageSelector.tsx`) integrado no cabeçalho ao lado do tema.
   * Alterne instantaneamente entre **Português (Brasil)** e **English (US)** com persistência local no navegador.

5. **🛡️ Stack Atualizada para Máxima Segurança e Performance:**
   * **Next.js `16.4.4`**
   * **React & React DOM `19.3.1`**
   * **Node.js `26.13.0`** (LTS estável) no container Docker de produção.

---

## 🚀 Início Rápido com Docker

Suba o container com apenas um comando no seu servidor ou ambiente local:

```bash
docker run -d \
  --name libredb-studio \
  -p 3000:3000 \
  --restart unless-stopped \
  alaxricard/libredb-studio:latest
```

Acesse **`http://localhost:3000`** no seu navegador. No primeiro início, as credenciais administrativas são exibidas nos logs do container (`docker logs libredb-studio`).

---

## 🐳 Docker Compose

Para rodar com persistência de dados e variáveis de ambiente configuradas:

```yaml
version: "3.8"

services:
  libredb-studio:
    image: alaxricard/libredb-studio:latest
    container_name: libredb-studio
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - AUTH_COOKIE_SECURE=false # Defina como true se estiver atrás de HTTPS com certificado SSL
      - JWT_SECRET=sua-chave-secreta-forte-com-mais-de-32-caracteres
      - ADMIN_EMAIL=admin@ricardtech.top
      - ADMIN_PASSWORD=SuaSenhaForteAqui
    volumes:
      - libredb_data:/app/data

volumes:
  libredb_data:
```

---

## 🗄️ Mais de 40 Motores Suportados em Uma Única Interface

* **Bancos Relacionais SQL:** PostgreSQL, MySQL, MariaDB, SQLite, DuckDB, libSQL, Oracle, Microsoft SQL Server, Db2 LUW, ClickHouse, Databend, Snowflake, Trino, BigQuery, Apache Spark, ScyllaDB, YugabyteDB, CockroachDB.
* **Bancos NoSQL & Documentos:** MongoDB, Redis, Valkey, Couchbase, Firestore, DragonflyDB, Garnet, Oxia.
* **Busca & Séries Temporais:** InfluxDB, Prometheus, OpenSearch, Elasticsearch, Druid, TimescaleDB.
* **Vetoriais & Grafos:** Neo4j, Milvus, Qdrant, Weaviate.
* **Mensageria & Infraestrutura:** Apache Kafka, RabbitMQ, MQTT, etcd, Kubernetes, S3 Object Storage, OPC UA, Modbus, SNMP.

---

## 🔒 Segurança e Autenticação

* **Controle de Acesso Baseado em Papéis (RBAC):** Perfis de Administrador e Usuário comum com restrições granulares.
* **Single Sign-On (SSO):** Suporte nativo a OpenID Connect (OIDC) e provedores OAuth2.
* **Mascaramento de Dados Sensíveis:** Oculte colunas confidenciais (cartões, CPF, e-mails) com regras automáticas configuráveis.
* **Segurança de Execução:** Diálogo de confirmação para instruções destrutivas (`DROP`, `TRUNCATE`, `DELETE sem WHERE`).

---

## ⚙️ Variáveis de Ambiente Úteis

| Variável | Padrão | Descrição |
| :--- | :--- | :--- |
| `PORT` | `3000` | Porta HTTP em que o servidor escuta. |
| `JWT_SECRET` | *(aleatório)* | Chave secreta para assinatura dos tokens de autenticação (mínimo 32 caracteres). |
| `ADMIN_EMAIL` | *(gerado)* | E-mail da conta de administrador padrão. |
| `ADMIN_PASSWORD` | *(gerado)* | Senha da conta administrativa. |
| `AUTH_COOKIE_SECURE` | `true` | Alterne para `false` se for acessar via HTTP local/IP sem HTTPS. |
| `BASE_PATH` | `""` | Prefixo de sub-rota caso publicado em subdiretório (ex: `/studio`). |

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [`LICENSE`](LICENSE) para mais detalhes.
