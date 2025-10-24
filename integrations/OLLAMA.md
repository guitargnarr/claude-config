# Ollama Models Integration

**Location:** Local system (M3 Max, Metal GPU acceleration)

---

## Available Models

To call models, use: `!ollama run model-name "question"`

**Active Models:**
- **matthew-career-coach**: Interview prep, professional background reference
- **code-executor**: Python code generation (CodeLlama 7B)
- **data-analyzer-qwen**: Structured JSON analysis (Qwen 2.5 7B)
- **barrier-breaker**: Hiring system tactics and strategies
- **louisville-job-market**: Louisville KY employer/market data (October 2025)
- **quick-advisor-phi**: Fast brief responses (Phi3 Mini)
- **humanizer**: Text naturalization (can delete if needed)

## Model Specs

- Total: 7 active models, 16.9 GB disk
- Optimized: M3 Max (30 GPU cores, 36 GB RAM, 14 CPU cores)
- Parameters: temp 0.3-0.8, ctx 4K-32K, Metal GPU acceleration
