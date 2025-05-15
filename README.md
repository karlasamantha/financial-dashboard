# Financial Dashboard para BIX Tecnologia
Um projeto para o code challenge da BIX Tecnologia.

## Tecnologias Usadas

- Next.js 15
- React 19
- Chakra UI (incluindo @chakra-ui/charts)
- Recharts
- SWR
- Zod
- Styled Components
- Lucide React
- Emotion
- Typescript
- Jest

## Estrutura de Pastas

```
src/
  app/
    page.tsx            # Landing page
    layout.tsx          # Layout global
    dashboard/
      page.tsx          # Dashboard
    login/
      page.tsx          # Página de login
      login-form.tsx    # Formulário de login
      actions.ts        # Lógica de autenticação
    api/
      data/route.ts     # Endpoint de dados
      session/route.ts  # Endpoint de sessão
  components/
    ui/
      bar-chart.tsx
      line-chart.tsx
      select-filter.tsx
      stats-card.tsx
      transaction-table.tsx
      sidebar.tsx
      provider.tsx
  context/
    FilterContext.tsx   # Contexto de filtros
  hooks/
    useTransactionsData.ts
    useIsMobile.ts
    useSessionStatus.ts
    useLocalStorage.ts
  lib/
    currency.ts
    session.ts
    registry.tsx
  styles/
    theme.ts            # Tema customizado Chakra
  data/
    transactions.json
test/
  api/
    route.test.ts
  session/
    route.test.ts
  hooks/
    useTransactionsData.test.ts
```

## Login do Usuário

Use as seguintes credenciais para acessar o dashboard:

- **Email:** test@example.com
- **Senha:** 123456

## Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd financial-dashboard
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```
3. **Rode o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
4. **Acesse no navegador:**
   http://localhost:3000
