# Express Template

Um template moderno e bem estruturado para aplicações Express com TypeScript, seguindo as melhores práticas de desenvolvimento.

## 📋 Sobre o Projeto

Este template fornece uma base sólida para iniciar projetos com Express.js, incluindo configurações pré-definidas de TypeScript, ESLint, Prettier e uma arquitetura organizada em camadas (Controller, Service, Routes).

### 🚀 Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **Express 5** - Framework web minimalista e flexível
- **TypeScript** - Superset JavaScript com tipagem estática
- **TSX** - TypeScript executor para desenvolvimento
- **ESLint** - Linter para identificar e corrigir problemas no código
- **Prettier** - Formatador de código opinativo
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Middleware para habilitar CORS

### 📁 Estrutura do Projeto

```
express-template/
├── app/
│   ├── index.ts           # Ponto de entrada da aplicação
│   ├── app.routes.ts      # Definição das rotas
│   ├── app.controller.ts  # Controladores (lógica de requisição/resposta)
│   └── app.service.ts     # Serviços (lógica de negócio)
├── dist/                  # Arquivos compilados (gerado após build)
├── eslint.config.mjs      # Configuração do ESLint
├── tsconfig.json          # Configuração do TypeScript
└── package.json           # Dependências e scripts
```

### 🎯 Funcionalidades

- ✅ Configuração TypeScript moderna
- ✅ Hot reload durante o desenvolvimento
- ✅ Linting e formatação de código automatizados
- ✅ Arquitetura em camadas (Routes → Controller → Service)
- ✅ CORS configurável
- ✅ Variáveis de ambiente
- ✅ Endpoint de healthcheck

## 🔧 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Clonando o Repositório

```bash
# Clone o repositório
git clone https://github.com/wesleyara/express-template.git

# Entre no diretório do projeto
cd express-template

# Instale as dependências
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=8080
CORS_ORIGIN=*
```

### Variáveis de Ambiente

| Variável     | Descrição                           | Padrão |
|-------------|-------------------------------------|--------|
| `PORT`      | Porta onde o servidor será executado | 8080   |
| `CORS_ORIGIN` | Origem permitida para requisições CORS | *    |

## 🚀 Como Rodar

### Modo Desenvolvimento

Inicia o servidor com hot reload:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:8080`

### Modo Produção

```bash
# Compila o projeto
npm run build

# Inicia o servidor compilado
npm start
```

## 📝 Scripts Disponíveis

| Script         | Descrição                                      |
|---------------|------------------------------------------------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento com hot reload |
| `npm run build` | Compila o TypeScript para JavaScript na pasta `dist/` |
| `npm start` | Inicia o servidor a partir dos arquivos compilados |

## 🔍 Endpoints

### Healthcheck

Verifica se a API está funcionando corretamente.

```
GET /api
```

**Resposta de sucesso (200):**

```json
{
  "status": 200,
  "date": "2025-11-01T10:00:00.000Z",
  "message": "OK"
}
```

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

1. **Routes** (`app.routes.ts`) - Define as rotas e mapeia para os controllers
2. **Controller** (`app.controller.ts`) - Processa requisições HTTP e envia respostas
3. **Service** (`app.service.ts`) - Contém a lógica de negócio

Esta separação facilita a manutenção, testabilidade e escalabilidade do código.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commitar suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Fazer push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👤 Autor

**Wesley Ara**

- GitHub: [@wesleyara](https://github.com/wesleyara)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
