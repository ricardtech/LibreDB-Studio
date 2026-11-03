# Registro de Alterações (Changelog)

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [2.0.0-ricardtech] - 03/11/2026

### 🚀 Novidades e Recursos (Inspirados no DbGate)
- **Truncamento de Tabela em 1 Clique:**
  - Adicionada a ação de truncamento rápido no menu de contexto das tabelas na árvore de objetos (`ObjectTree`).
  - Modal de segurança dedicado (`TruncateTableModal.tsx`) com aviso visual em vermelho, nome da tabela destacado e prévia da instrução SQL.
  - Suporte automático a `CASCADE` no PostgreSQL para tabelas com relacionamentos e chaves estrangeiras.
  - Gerador multi-dialeto inteligente (`generateTruncateQuery`): adapta a instrução para `TRUNCATE TABLE` (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server), `DELETE FROM` (SQLite) e `deleteMany` (MongoDB).
- **Exploração Rápida de Dados ("Ver Dados da Tabela"):**
  - Opção no menu de contexto de cada tabela para abrir diretamente a visualização em grade paginada sem precisar digitar comandos SQL manualmente.
- **Edição Inline Ativa por Padrão (Estilo DbGate):**
  - O modo de edição rápida de células agora vem ativado por padrão para bancos SQL compatíveis (PostgreSQL, MySQL, SQLite, MSSQL, Oracle).
  - Duplo clique em qualquer célula de tabela permite alterar o valor imediatamente com confirmação em lote.
  - Barra inferior de estatísticas (`StatsBar.tsx`) aprimorada com botões visíveis de **[Salvar]** (verde) e **[Descartar]** (vermelho).
- **Internacionalização Completa (i18n):**
  - Implementado sistema nativo e reativo de internacionalização (`src/lib/i18n/`).
  - Suporte completo a **Português do Brasil (`pt-BR`)** como padrão do fork, além de suporte contínuo ao **Inglês (`en`)**.
  - Componente de seleção rápida de idioma (`LanguageSelector.tsx`) integrado aos cabeçalhos Desktop e Mobile ao lado do alternador de tema.
  - Persistência automática da preferência de idioma no `localStorage` (`libredb_lang`).

### 📦 Atualizações de Dependências e Segurança
- **React & React DOM:** Atualizados de `^19.2.8` para **`^19.3.1`** (correção de bugs de concorrência e tipagens).
- **Next.js:** Atualizado de `^16.3.6` para **`^16.4.4`** (otimizações de runtime, empacotamento Turbopack e patches de SSR).
- **Tipagens TypeScript:** `@types/react` e `@types/react-dom` atualizados para **`^19.3.1`**, e `eslint-config-next` para **`^16.4.4`**.
- **Runtime Docker:** Mantido o **Node.js `26.13.0-trixie-slim`** no `Dockerfile`, garantindo máxima estabilidade e compatibilidade com drivers nativos compilados em C++ (`better-sqlite3`, `duckdb`).

### 🛠️ Ajustes de Identidade e Versionamento
- Atualizado o manifesto do pacote para `@ricardtech/libredb-studio` versão **`2.0.0-ricardtech`**.
- Documentação e README traduzidos e adaptados para o ecossistema RicardTech.
