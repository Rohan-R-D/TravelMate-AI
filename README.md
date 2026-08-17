# ✈️ TripMate AI

## 🌍 A Multi-Agent Travel Planner with LangGraph

An open-source AI travel planner that turns a natural-language trip request into a practical travel plan with flight suggestions, hotel ideas, and a day-by-day itinerary.

TripMate AI uses a multi-agent workflow built with **LangGraph, LangChain, Groq, Tavily, AviationStack, PostgreSQL, and FastAPI**.

---

## 🧭 Why This Project?

Planning a trip usually means jumping between multiple websites, tools, and spreadsheets.

**TripMate AI** brings that entire workflow into one experience by combining:

* ✈️ Flight-search agent
* 🏨 Hotel-research agent
* 🗺️ Itinerary-planning agent
* 🧠 Final response agent
* 💾 PostgreSQL conversation-state persistence
* ⚡ Groq-powered LLM responses

All agents are coordinated through a **LangGraph workflow**.

---

# 🤖 Multi-Agent Workflow

```text
                         👤 USER
                           │
                           ▼
              ┌────────────────────────┐
              │   Natural Language      │
              │     Travel Request      │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │      LangGraph         │
              │     Workflow Engine    │
              └────────────┬───────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
     ┌────────────┐ ┌────────────┐ ┌──────────────┐
     │ ✈️ Flight  │ │ 🏨 Hotel   │ │ 🗺️ Itinerary │
     │   Agent    │ │   Agent    │ │    Agent     │
     └─────┬──────┘ └─────┬──────┘ └──────┬───────┘
           │              │               │
           └──────────────┼───────────────┘
                          │
                          ▼
               ┌────────────────────┐
               │ 🧠 Final Response   │
               │       Agent        │
               └──────────┬─────────┘
                          │
                          ▼
               ┌────────────────────┐
               │ ✨ Complete Travel │
               │       Plan         │
               └────────────────────┘
```

---

# ✨ Features

| Feature                      | Description                                     |
| ---------------------------- | ----------------------------------------------- |
| ✈️ Flight Research           | Flight research using AviationStack             |
| 🏨 Hotel Suggestions         | Hotel suggestions using Tavily search           |
| 🧠 Multi-Agent Orchestration | Multi-agent orchestration with LangGraph        |
| 📝 Structured Itinerary      | Structured travel itinerary generation          |
| 🌐 FastAPI Backend           | FastAPI backend with a simple web interface     |
| 💾 Conversation State        | Conversation state persistence using PostgreSQL |
| ⚡ LLM-Powered Responses      | LLM-powered responses with Groq                 |

---

# 🛠️ Tech Stack

## 🐍 Backend

* Python 3.10+
* FastAPI
* LangGraph
* LangChain
* Groq LLMs
* PostgreSQL

## 🎨 Frontend

* Jinja2
* HTML
* CSS
* JavaScript

## 🔌 APIs

* Tavily API
* AviationStack API

---

# 📁 Project Structure

```text
.
├── app.py                # FastAPI app entry point
├── backend.py            # LangGraph travel workflow
├── requirements.txt      # Python dependencies
├── static/               # Static frontend assets
├── templates/            # HTML templates
└── tools/                # Flight and web search integrations
```

---

# ⚙️ Prerequisites

Before running the project locally, make sure you have:

* Python 3.10 or newer installed
* PostgreSQL running and accessible
* Groq API key
* Tavily API key
* AviationStack API key

---

# 🔐 Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/travel_db

GROQ_API_KEY=your_groq_api_key

AVIATIONSTACK_API_KEY=your_aviationstack_api_key

TAVILY_API_KEY=your_tavily_api_key

DEFAULT_ORIGIN_IATA=DAC
```

> ⚠️ Never commit your `.env` file or expose your API keys publicly.

Add `.env` to `.gitignore`:

```gitignore
.env
.venv/
__pycache__/
*.pyc
```

---

# 🚀 Installation

## 1️⃣ Create a Virtual Environment

```bash
python -m venv .venv
```

## 2️⃣ Activate the Virtual Environment

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Running the App

Start the FastAPI server:

```bash
python app.py
```

Then open your browser:

```text
http://127.0.0.1:8000/
```

---

# 🔌 API Endpoints

| Method | Endpoint      | Purpose                 |
| ------ | ------------- | ----------------------- |
| `GET`  | `/health`     | Health check            |
| `POST` | `/api/travel` | Submit a travel request |

---

# 📡 Example API Request

```bash
curl -X POST http://127.0.0.1:8000/api/travel \
  -H "Content-Type: application/json" \
  -d '{"message":"Plan a 3-day trip to Tokyo with a budget of $1200"}'
```

---

# 🔄 How the Workflow Works

## 1️⃣ User Submits a Travel Request

The user submits a natural-language travel request.

```text
User
 │
 │ Natural-language request
 ▼
LangGraph Workflow
```

---

## 2️⃣ ✈️ Flight Agent

The flight agent gathers flight-related information using AviationStack.

```text
Travel Request
      │
      ▼
✈️ Flight Agent
      │
      ▼
Flight Information
```

---

## 3️⃣ 🏨 Hotel Agent

The hotel agent searches for accommodation suggestions using Tavily.

```text
Travel Request
      │
      ▼
🏨 Hotel Agent
      │
      ▼
Accommodation Suggestions
```

---

## 4️⃣ 🗺️ Itinerary Agent

The itinerary agent combines the available travel information and generates a practical travel plan.

```text
Flight Information
        +
Hotel Suggestions
        │
        ▼
🗺️ Itinerary Agent
        │
        ▼
Practical Travel Plan
```

---

## 5️⃣ 🧠 Final Response Agent

The final agent combines all generated information and formats it into a polished travel response.

```text
Flight Information
        +
Hotel Suggestions
        +
Travel Itinerary
        │
        ▼
🧠 Final Response Agent
        │
        ▼
✨ Polished Travel Plan
```

---

# 🧩 Complete Workflow

```text
                         👤 USER
                           │
                           ▼
                 ┌───────────────────┐
                 │ Travel Request    │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │    LangGraph      │
                 │     Workflow      │
                 └─────────┬─────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
      ┌──────────┐   ┌──────────┐   ┌────────────┐
      │ ✈️       │   │ 🏨       │   │ 🗺️         │
      │ Flight   │   │ Hotel    │   │ Itinerary  │
      │ Agent    │   │ Agent    │   │ Agent      │
      └────┬─────┘   └────┬─────┘   └─────┬──────┘
           │              │               │
           └──────────────┼───────────────┘
                          │
                          ▼
                 ┌───────────────────┐
                 │ 🧠 Final Agent    │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ ✨ Final Travel   │
                 │      Plan         │
                 └───────────────────┘
```

---

# 🗄️ PostgreSQL

TripMate AI uses **PostgreSQL** for:

* Conversation state persistence
* Travel conversation data

The database connection is configured through:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/travel_db
```

PostgreSQL allows the application to maintain conversation-related state while users interact with the travel planner.

---

# 🧠 LangGraph + LangChain

The project uses **LangGraph** to coordinate the multi-agent workflow.

**LangChain** provides the framework and components used by the agents and LLM integrations.

The agents work together to process the user's travel request and produce the final travel plan.

```text
                    LangGraph
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ✈️ Flight      🏨 Hotel      🗺️ Itinerary
      Agent         Agent           Agent
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
                 🧠 Final Agent
```

---

# 🤖 Groq LLM

TripMate AI uses **Groq LLMs** to power AI-generated responses.

The Groq API key is configured through:

```env
GROQ_API_KEY=your_groq_api_key
```

The LLM is used to process travel requests, generate itinerary content, and produce the final travel response.

---

# ✈️ AviationStack

**AviationStack** is used for flight research.

The API key is configured through:

```env
AVIATIONSTACK_API_KEY=your_aviationstack_api_key
```

The default origin airport is configured using:

```env
DEFAULT_ORIGIN_IATA=DAC
```

---

# 🔎 Tavily

**Tavily** is used for hotel research and web search.

The API key is configured through:

```env
TAVILY_API_KEY=your_tavily_api_key
```

The hotel agent uses Tavily to research accommodation options and relevant travel information.

---

# 🌐 FastAPI

**FastAPI** provides the backend API and web application interface.

Start the application with:

```bash
python app.py
```

The application is then available at:

```text
http://127.0.0.1:8000/
```

---

# 📡 API Reference

## Health Check

### `GET /health`

Used for checking the application health.

Example:

```bash
curl http://127.0.0.1:8000/health
```

---

## Travel Request

### `POST /api/travel`

Used to submit a natural-language travel request.

Example:

```bash
curl -X POST http://127.0.0.1:8000/api/travel \
  -H "Content-Type: application/json" \
  -d '{"message":"Plan a 3-day trip to Tokyo with a budget of $1200"}'
```

---



# ✈️ TripMate AI

```text
Natural Language
       │
       ▼
   LangGraph
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
✈️     🏨     🗺️
Flight Hotel Itinerary
 │     │     │
 └─────┼─────┘
       ▼
   🧠 Final AI
       │
       ▼
✨ Travel Plan
```

**Plan smarter. Travel better. ✈️🌍**


Live Link


https://tripmate-ai-a-multi-agent-travel-planner-q6c1.onrender.com
