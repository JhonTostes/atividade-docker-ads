# Atividade Docker: Orquestração de Containers (ADS)

Este projeto apresenta uma aplicação Full Stack distribuída em microsserviços, desenvolvida para a disciplina de Análise e Desenvolvimento de Sistemas. O objetivo é demonstrar a orquestração de containers utilizando Docker Compose.

## Funcionalidades
O sistema é composto por três camadas isoladas:
1.  **Frontend:** Interface Web estática para interação com o usuário.
2.  **Backend:** API REST que gerencia as regras de negócio.
3.  **Banco de Dados:** Persistência de dados relacional.

A aplicação permite:
* Listagem automática de usuários cadastrados.
* Cadastro de novos usuários via formulário web ou chamada de API direta.

## Instruções de Execução

### Pré-requisitos
* Docker e Docker Compose instalados.

### Passos
1.  Clone o repositório e entre na pasta:
    ```bash
    git clone <URL_DO_SEU_REPO>
    cd atividade-docker-ads
    ```

2.  Suba os containers (o build é automático):
    ```bash
    docker compose up --build
    ```

3.  Para encerrar a aplicação:
    ```bash
    docker compose down
    ```

## Serviços e Portas Utilizadas

| Serviço | Container | Porta Interna | Porta Externa (Host) | Tecnologia |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | `frontend-container` | 80 | **3000** | Nginx + HTML |
| **Backend** | `backend-container` | 3000 | **4000** | Node.js + Express |
| **Banco** | `db-container` | 5432 | **5432** | PostgreSQL |

## Exemplos de Teste

### 1. Via Navegador (Interface Gráfica)
Acesse **http://localhost:3000**. Você verá o formulário de cadastro e a lista de usuários.

### 2. Via Rota da API (Teste Técnico)
Você pode testar diretamente a comunicação com o Backend sem passar pelo Frontend:

* **Listar Usuários (GET):**
    Acesse no navegador: `http://localhost:4000/users`

* **Cadastrar Usuário (POST via Terminal/Curl):**
    ```bash
    curl -X POST http://localhost:4000/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Teste Via Curl"}'
    ```

---
**Aluno:** Jonathan Tostes Prado Nunes
**Curso:** Análise e Desenvolvimento de Sistemas - 6º período