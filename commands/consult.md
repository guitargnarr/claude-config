# /consult - Multi-Model Domain Expert Consultation

Query specialized Ollama models for holistic, multi-perspective analysis on complex problems.

## Usage
```
/consult <question>
```

## How It Works

1. **Analyze the question** to identify relevant domains (technical, wealth, tax, personal)
2. **Select 2-4 models** most relevant to the question
3. **Query models in parallel** via Ollama REST API
4. **Synthesize responses** into actionable recommendations

## Domain Routing

| Keywords | Models Selected |
|----------|-----------------|
| architecture, design, patterns, API | app-architecture-expert, llm-orchestration-ontology |
| prompt, LLM, AI, model | prompt-engineering-expert, llm-orchestration-ontology |
| performance, latency, metrics | performance-percentiles-expert, app-architecture-expert |
| tax, deduction, 1031, S-corp | business-tax-2026, cpa-wealth-advisor, homeowner-tax-strategies |
| invest, passive income, rental | passive-income-expert, real-estate-investor, wealth-mindset |
| skills, career, learning | skill-stack-expert, skill-stacker, productivity-systems-expert |
| nonprofit, 501c3, structure | ngo-corporate-structures, deal-structuring-expert |
| complex/multi-domain | unified-systems-architect (always included for synthesis) |

## Execution Instructions

When user invokes `/consult <question>`:

### Step 1: Classify Domains
Analyze the question for domain keywords. Map to relevant models (2-4 max).

### Step 2: Query Models
For each selected model, call Ollama API:

```bash
curl -s http://localhost:11434/api/generate -d '{
  "model": "<MODEL_NAME>",
  "prompt": "<USER_QUESTION>",
  "stream": false
}' | jq -r '.response'
```

### Step 3: Synthesize
After collecting all responses:
1. Identify common themes across responses
2. Note any conflicting recommendations
3. Extract concrete action items
4. Prioritize by impact and feasibility

### Step 4: Present Results
Format output as:

```
## Multi-Model Analysis: <Question Summary>

### Models Consulted
- model-1 (domain)
- model-2 (domain)

### Key Insights

**From model-1:**
<condensed insight>

**From model-2:**
<condensed insight>

### Synthesized Recommendations

1. **[High Priority]** <action item>
2. **[Medium Priority]** <action item>
3. **[Consider]** <action item>

### Cross-Domain Considerations
<any conflicts or nuances between domain perspectives>
```

## Available Models (19)

### Meta (Synthesis)
- `unified-systems-architect` - Cross-domain synthesis, holistic analysis

### Technical (5)
- `llm-orchestration-ontology` - Multi-agent systems, orchestration patterns
- `prompt-engineering-expert` - Prompt design, debugging, optimization
- `kg-traversal-expert` - Knowledge graphs, SPARQL, Cypher
- `app-architecture-expert` - Web architecture, SSR, SPA, microservices
- `performance-percentiles-expert` - p50/p95/p99, SLOs, error budgets

### Wealth (4)
- `wealth-mindset` - Leverage, ownership thinking
- `passive-income-expert` - Income streams, investment strategies
- `real-estate-investor` - BRRRR, financing, rental properties
- `deal-structuring-expert` - M&A, acquisitions, deal financing

### Tax/Legal (4)
- `business-tax-2026` - Current tax laws, OBBBA provisions
- `cpa-wealth-advisor` - Business owner optimization, retirement
- `homeowner-tax-strategies` - Deductions, 1031 exchanges, depreciation
- `ngo-corporate-structures` - Nonprofit structures, 501c3/c4

### Personal (4)
- `skill-stack-expert` - Power skill stacks for career acceleration
- `skill-stacker` - Skill development strategy
- `productivity-systems-expert` - Time management, focus, GTD
- `world-model-expert` - Mental models, systems thinking

### Utility (1)
- `english-to-spanish` - Translation

## Example Invocations

```
/consult I'm refactoring a monolith into microservices. The codebase has 50k LOC, mixed sync/async patterns, and no tests. What's my attack plan?
```
→ Routes to: app-architecture-expert, performance-percentiles-expert, llm-orchestration-ontology
→ Output: Phased decomposition strategy with SLO targets for each service boundary

```
/consult Building an MCP server that needs to handle 100 concurrent tool calls with <200ms p99. What architecture patterns and where do I set backpressure?
```
→ Routes to: performance-percentiles-expert, app-architecture-expert, llm-orchestration-ontology
→ Output: Worker pool sizing, queue depth limits, circuit breaker placement

```
/consult I have 6 Ollama models that each take 30s to respond. How do I orchestrate them for a code review workflow where I need all perspectives before generating the final report?
```
→ Routes to: llm-orchestration-ontology, prompt-engineering-expert, app-architecture-expert
→ Output: Parallel fan-out pattern, structured message schema, aggregation strategy

```
/consult My client site generator creates 50+ sites. What's the optimal CI/CD architecture for deploying updates across all of them without manual intervention?
```
→ Routes to: app-architecture-expert, performance-percentiles-expert
→ Output: Matrix deployment strategy, rollback triggers, canary percentage

```
/consult I want to productize my Claude Code skills as a paid service. What's the business structure for liability protection while maximizing tax efficiency?
```
→ Routes to: unified-systems-architect, cpa-wealth-advisor, deal-structuring-expert, ngo-corporate-structures
→ Output: Entity structure recommendation, revenue recognition strategy, insurance considerations
