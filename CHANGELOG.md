# Registro de Alterações (Changelog)

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [2.0.4-ricardtech] - 03/11/2026

### 🌐 Tradução 100% da Tela de Login, Abertura Imediata de Catálogo & Responsividade Lateral
- **Tradução 100% da Página de Login (`/login`):**
  - Hero institucional localizado para pt-BR (*O IDE SQL open-source que roda junto dos seus dados*), descrição e sumário de compatibilidade por protocolo.
  - Cartão de autenticação, cabeçalhos, formulário (*Email, Senha, Código de autenticação*), botões (*Entrar, Autenticando..., Entrar com SSO, Entrar com OpenShift, Usar chave de acesso (Passkey)*) e rodapé corporativo (*Segurança empresarial impulsionada pelo motor LibreDB Studio*).
  - Alertas e mensagens de toast totalmente em português.
- **Abertura Imediata do Catálogo sob Demanda:**
  - O painel de catálogo adiado na árvore de objetos agora é 100% interativo: basta clicar em cima do cartão ou no botão *"Carregar objetos"* para abrir imediatamente todas as tabelas e views do banco de dados.
  - Clicar na conexão ativa na lista de conexões também aciona o carregamento imediato do catálogo.
- **Menu Lateral Totalmente Responsivo:**
  - Otimização do layout vertical do `Sidebar` e `TreePanel`, eliminando padding excessivo e garantindo que o menu lateral nunca cubra as conexões ou o rodapé em resoluções reduzidas ou dentro de iframes (Ricard Hub Desktop).
- **Sincronização de Conexões no Painel Administrativo (`/admin`):**
  - `useAllConnections` agora busca diretamente as conexões salvas no volume persistente do servidor caso o navegador ainda não as tenha puxado no editor, além de escutar mutações em tempo real.
  - Todos os bancos de dados cadastrados passam a ser visíveis e monitorados no *Status dos Servidores* na aba Visão Geral do painel administrativo.

---

## [2.0.3-ricardtech] - 03/11/2026

### 🛡️ Integração com Ricard Hub e Dashboards (Suporte a Iframe & Cookies Particionados)
- **Eliminação da Tela Branca em Iframes:**
  - Adicionado suporte nativo e configurável para incorporação em iframes via `ALLOW_IFRAME_EMBED=true` (ativado por padrão na imagem Docker) e diretiva CSP `FRAME_ANCESTORS` (padrão `'self' *`).
  - Remoção automática do cabeçalho restritivo `X-Frame-Options: DENY` quando a incorporação estiver habilitada, permitindo que o Ricard Hub e outros hubs/dashboards incorporem o estúdio perfeitamente.
- **Sessão Persistente sem Desconexão (CHIPS / Cookies Particionados):**
  - Implementado suporte a cookies `SameSite=None; Secure; Partitioned` para o cookie de sessão `auth-token`.
  - Navegadores modernos e WebViews (incluindo o Ricard Hub - Desktop) agora mantêm a sessão autenticada de forma persistente, evitando que o usuário seja desconectado ou precise refazer login ao alternar abas, recarregar a página ou navegar entre tabelas.
- **Integração de Origens no Check CSRF:**
  - Domínios informados em `FRAME_ANCESTORS` são automaticamente incluídos nos hosts aceitos para requisições com alteração de estado.

---

## [2.0.2-ricardtech] - 03/11/2026

### 🌐 Internacionalização Completa (100% pt-BR)
- **Painel Administrativo & Operações:**
  - Tradução integral da aba **Operações**: *Operações Globais*, cartões de ação (*Atualizar Estatísticas / Executar Analyze, Recuperar Espaço / Executar Vacuum, Reconstruir Índices / Executar Reindex*), avisos de segurança de recursos e estatísticas detalhadas de *Tabelas* (inchaço/bloat, linhas) e *Sessões* (Ativas, Ociosas, Em Transação, Em Espera).
  - Tradução integral da aba **Contas**: cabeçalhos, formulário de adição, selos de papel/permissão (*Admin, Usuário, Somente Leitura*), status de 2FA, Chaves de Acesso (*Passkeys*) e datação localizada.
  - Tradução dos componentes de segurança: autenticador 2FA (*Seu autenticador, Senha atual, Configurar autenticador*) e chaves de acesso biométricas (*Passkeys*).
  - Tradução integral da aba **Auditoria**: sub-abas (*Operações, Consultas, Estatísticas*), filtros de tipo, busca, taxa de sucesso, aviso de proxy e estados vazios.
  - Tradução integral da aba **Visão Geral**: cartões de métricas principais, volume de consultas (7 dias), atividades recentes e ações rápidas de manutenção.
- **Visualizador ERD (Diagrama de Entidade-Relacionamento):**
  - Tradução do cabeçalho, contagem de relações (*tabelas, views, relacionamentos*), filtro de busca (*Filtrar tabelas...*), aviso heurístico de integridade referencial (*Sem chaves estrangeiras disponíveis*), alternador *Compacto / Detalhes* e rótulos de nós.
- **Modal de Conexão:**
  - Tradução completa dos modais de criação e edição: *Nova Conexão, Editar Conexão, Colar URL de Conexão, Tempo Limite de Consulta, Ignorar catálogo inicial, Cancelar, Testar Conexão, Conectando...*.
- **Painel de Monitoramento:**
  - Tradução completa do cabeçalho e todas as sub-abas (*Visão Geral, Desempenho, Consultas, Sessões, Tabelas, Armazenamento, Pool*), seções de acerto de cache (*Cache Hit Ratio*), *Estatísticas Rápidas* e sumário de desempenho.
- **Barra de Resultados & Objetos:**
  - Tradução dinâmica da barra inferior de estatísticas (*X linhas, colunas, carregar mais, limitado*).
  - Tradução do painel de leitura adiada na árvore de objetos para conexões sob demanda.

### 🔗 Repositório Oficial do Fork
- Redirecionamento completo de todos os links de cabeçalho, rodapé e versão clicável na barra lateral diretamente para o repositório oficial do fork: [github.com/ricardtech/LibreDB-Studio](https://github.com/ricardtech/LibreDB-Studio).

---

## [2.0.1-ricardtech] - 03/11/2026

### 🐛 Correções de Compatibilidade (ClickHouse)
- **Compatibilidade Universal com ClickHouse e Aptabase:**
  - Corrigido o erro fatal `Code: 47. DB::Exception: There's no column 'mv.target_table' in table 'mv'`.
  - O LibreDB oficial assumia a existência das colunas `target_table` e `target_database` introduzidas no ClickHouse 26+, quebrando qualquer servidor ClickHouse em versão estável anterior (incluindo instâncias Aptabase).
  - Substituída a subquery rígida pela filtragem estrutural universal `t.name NOT LIKE '.inner_id.%' AND t.name NOT LIKE '.inner.%'`, compatível com 100% das versões do ClickHouse.

### 🌐 Internacionalização Estendida (pt-BR 100%)
- **Painel Administrativo (`/admin`):**
  - Tradução completa do cabeçalho, subtítulo e abas de navegação (*Visão Geral, Operações, Monitoramento, Segurança, Contas, Auditoria*).
  - Tradução dos cartões de métricas (*Todos os Sistemas Operacionais, Total de Consultas, Tamanho dos Bancos, Conexões, Hoje vs ontem, Status dos Servidores*).
  - Inclusão do alternador de idioma (`LanguageSelector`) diretamente no cabeçalho do Admin Dashboard.
- **Editor de Consultas & Barra de Ferramentas:**
  - Botões de ação traduzidos: `EXECUTAR` (`RUN`), `Executar Seleção` (`Run Selected`), `Formatar` (`Format`), `Copiar` / `Copiar Sel`, `Limpar` (`Clear`), `Linhas` (`Lines`), `Explicar` (`Explain`), `EDITAR` (`EDIT`), `SANDBOX` e `IMPORTAR` (`IMPORT`).
- **Navegador de Objetos e Barra Lateral:**
  - Rótulo de seção traduzido para `Conexões`.
  - Placeholder de busca traduzido para `Filtrar objetos carregados...`.
  - Pastas da árvore traduzidas dinamicamente: `Tabelas`, `Views`, `Views Materializadas`, `Dicionários`, `Funções`, `Procedimentos`, `Gatilhos`, `Índices`.
- **Painel de Resultados Inferior (`BottomPanel`):**
  - Abas traduzidas: `Resultados`, `Explicar`, `Histórico`, `Salvos`, `Gráficos`, `Tabela Dinâmica`, `Documentação`, `Diferenças`, `Painel`.
  - Mensagens de estado vazio: `Execute uma consulta ou veja o histórico` e `Pronto para consultar`.

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

