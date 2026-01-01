# 📧 Email-wrk

## 🧩 Introduction
A **production-grade background worker service** responsible for consuming and processing email-related tasks from **RabbitMQ**, with **Redis-backed retry handling**, **secure message verification**, and **graceful shutdown support**.

This service is designed to run as a **long-lived consumer**, not a web application.  
It performs deterministic background execution and scales horizontally.

## 📌 Project Status: Under Development
### What's Happening Now:
- Core worker architecture is in place
- RabbitMQ consumer integration finalized
- Redis-based retry mechanism implemented
- Business logic processing layer established
- Graceful shutdown handling added
- Ongoing refinement of error handling and observability

## 🛠️ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/Ayushya100/email-wrk.git
cd email-wrk

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Then configure your .env file

# Run using Docker (recommended)
docker compose up --build

# Scaling the worker
docker compose up --scale email-worker=5
```

## 📦 Tech Stack
- **Language:** Node.js
- **Runtime:** Node.js 20 (Alpine)
- **Message Broker:** RabbitMQ
- **Retry & Scheduling:** Redis
- **Containerization:** Docker & Docker Compose
- **Environment Management:** dotenv
- **Architecture:** Consumer-only Worker Service

---
**Email-wrk** — Reliable, Scalable, and Deterministic Email Task Processing 🚀