Markdown
# Content Engine & ComfyUI Workflow Integration

This repository contains the full-stack implementation for **Assignment 1 (Content Engine)** and the visual workflow deliverables for **Assignment 2 (ComfyUI Img2Img Integration)**.

---

## 🌐 Live Application Link
* **Live App:** [Insert Your Live App URL Here]

---

## 📁 Repository Structure

```text
content-engine-comfyui/
├── frontend/          # React / Vite frontend application
├── backend/           # IntelliJ (Java / Spring Boot) backend API
├── workflow.json      # Exported ComfyUI workflow configuration
└── screenshots/       # Generation outputs from ComfyUI
    ├── output_1.png
    └── output_2.png
🚀 Assignment Breakdown
Assignment 1: Content Engine
Frontend: Built with React and Vite for a fast, responsive user interface.

Backend: Developed in IntelliJ using Java to handle content generation requests, API routing, and processing.

Key Features: User input handling, real-time generation request handling, and modular backend API design.

Assignment 2: ComfyUI Img2Img Workflow
Workflow File: workflow.json (Loadable directly into ComfyUI).

Core Nodes Used: Load Image, KSampler, and Load Upscale Model (4x-UltraSharp).

Generations: Includes two distinct image variations generated using the same reference prompt with different seed values (see screenshots/ directory).

🛠️ Local Setup Instructions
Backend (IntelliJ / Java)
Navigate to the backend directory:

Bash
cd backend
Build and run the application via IntelliJ or terminal using your build tool (Maven/Gradle):

Bash
./mvnw spring-boot:run
Frontend (React)
Navigate to the frontend directory:

Bash
cd frontend
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev