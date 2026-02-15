# Ollama Model Manifest

**Updated:** 2026-02-08
**Total:** 86 models (~280 GB storage)
**Base Models:** llama3.2:3b (most custom), qwen2.5:7b (domain experts), phi4 (quick-advisor)
**All custom models:** System-prompt-only (no fine-tuning)

---

## Quick Reference

| I want to... | Use this model | Via |
|--------------|---------------|-----|
| Career coaching / interview prep | matthew-career-coach | `/coach`, resume-customizer, cover-letter-generator, interview-prep-auto |
| Louisville job market intel | louisville-job-market | `/louisville`, resume-customizer, cover-letter-generator, interview-prep-auto |
| Age bias / hiring tactics | barrier-breaker | `/tactic`, interview-prep-auto |
| Generate Python code | code-executor | `/code` |
| Analyze data to JSON | data-analyzer-qwen | `/analyze` |
| Quick brief answer | quick-advisor-phi | `/quick` |
| Humanize AI text | humanizer | `/humanize` |
| Score a client prospect | client-prospector | prospect skill |
| Frontend design direction | design-oracle | oracle-query-pattern |
| Design system grounding | design-system-atlas | oracle-query-pattern |
| Production TypeScript | elite-frontend | oracle-query-pattern |
| Domain expert consultation | See Domain Experts below | `/consult` |

---

## Career & Job Search (3)

| Model | Base | Size | Used By |
|-------|------|------|---------|
| matthew-career-coach | llama3.2:3b | 2.0 GB | /coach, resume-customizer, cover-letter-generator, interview-prep-auto |
| louisville-job-market | llama3.2:3b | 2.0 GB | /louisville, resume-customizer, cover-letter-generator, interview-prep-auto |
| barrier-breaker | llama3.2:3b | 2.0 GB | /tactic, interview-prep-auto |

---

## Dev Tools (3)

| Model | Base | Size | Used By |
|-------|------|------|---------|
| code-executor | codellama:7b | 3.8 GB | /code |
| data-analyzer-qwen | qwen2.5:7b | 4.7 GB | /analyze |
| humanizer | llama3.2:3b | 2.0 GB | /humanize |

---

## Design & Frontend (3)

| Model | Base | Size | Used By |
|-------|------|------|---------|
| design-oracle | qwen2.5:7b | 4.7 GB | oracle-query-pattern (creative direction) |
| design-system-atlas | qwen2.5:7b | 4.7 GB | oracle-query-pattern (system grounding) |
| elite-frontend | qwen2.5:7b | 4.7 GB | oracle-query-pattern (production TS code) |

---

## Domain Experts (19)

Used by `/consult` command for multi-model expert consultation.

| Model | Base | Size | Domain |
|-------|------|------|--------|
| unified-systems-architect | qwen2.5:7b | 4.7 GB | System architecture |
| app-architecture-expert | qwen2.5:7b | 4.7 GB | Application architecture |
| prompt-engineering-expert | qwen2.5:7b | 4.7 GB | Prompt engineering |
| business-tax-2026 | qwen2.5:7b | 4.7 GB | Business tax strategy |
| cpa-wealth-advisor | qwen2.5:7b | 4.7 GB | CPA / wealth management |
| real-estate-investor | qwen2.5:7b | 4.7 GB | Real estate investing |
| deal-structuring-expert | qwen2.5:7b | 4.7 GB | Deal structuring |
| ngo-corporate-structures | qwen2.5:7b | 4.7 GB | NGO / corporate structures |
| passive-income-expert | qwen2.5:7b | 4.7 GB | Passive income strategies |
| homeowner-tax-strategies | qwen2.5:7b | 4.7 GB | Homeowner tax optimization |
| llm-orchestration-ontology | qwen2.5:7b | 4.7 GB | LLM orchestration |
| performance-percentiles-expert | qwen2.5:7b | 4.7 GB | Performance metrics |
| kg-traversal-expert | qwen2.5:7b | 4.7 GB | Knowledge graph traversal |
| productivity-systems-expert | qwen2.5:7b | 4.7 GB | Productivity systems |
| world-model-expert | qwen2.5:7b | 4.7 GB | World modeling |
| skill-stack-expert | qwen2.5:7b | 4.7 GB | Skill stacking strategy |
| skill-stacker | qwen2.5:7b | 4.7 GB | Skill stacking (variant) |
| english-to-spanish | qwen2.5:7b | 4.7 GB | Translation |
| full-stack-engineer | qwen2.5:7b | 4.7 GB | Full-stack development |

---

## Chain-of-Thought Specialists (11)

Enhanced reasoning models with explicit CoT system prompts.

| Model | Base | Size | Domain |
|-------|------|------|--------|
| cot-software-architect | llama3.2:3b | 2.0 GB | Software architecture reasoning |
| cot-performance-engineer | llama3.2:3b | 2.0 GB | Performance optimization |
| cot-api-designer | llama3.2:3b | 2.0 GB | API design patterns |
| cot-career-strategist | llama3.2:3b | 2.0 GB | Career strategy |
| cot-opportunity-decoder | llama3.2:3b | 2.0 GB | Opportunity analysis |
| cot-productivity-engineer | llama3.2:3b | 2.0 GB | Productivity systems |
| cot-business-tax-strategist | llama3.2:3b | 2.0 GB | Tax strategy reasoning |
| cot-entity-structure-advisor | llama3.2:3b | 2.0 GB | Entity structuring |
| cot-deal-structurer | llama3.2:3b | 2.0 GB | Deal analysis |
| cot-real-estate-investor | llama3.2:3b | 2.0 GB | Real estate reasoning |
| cot-passive-income-strategist | llama3.2:3b | 2.0 GB | Passive income reasoning |

---

## Creative & Music (7)

| Model | Base | Size | Domain |
|-------|------|------|--------|
| drum_architect | qwen2.5:7b | 4.7 GB | Drum pattern generation |
| rhythm_architect | qwen2.5:7b | 4.7 GB | Rhythm composition |
| lead_architect | qwen2.5:7b | 4.7 GB | Lead guitar patterns |
| guitar_tone_architect | llama3.2:3b | 2.0 GB | Guitar tone design |
| master_guitar_instructor | llama3.2:3b | 2.0 GB | Guitar instruction |
| audio_production_strategist | llama3.2:3b | 2.0 GB | Audio production |
| content_strategist_pro | llama3.2:3b | 2.0 GB | Content strategy |

---

## Client & Prospecting (1)

| Model | Base | Size | Used By |
|-------|------|------|---------|
| client-prospector | llama3.2:3b | 2.0 GB | prospect skill |

---

## Utility & Quick (2)

| Model | Base | Size | Used By |
|-------|------|------|---------|
| quick-advisor-phi | phi3:mini | 2.2 GB | /quick |
| wealth-mindset | llama3.2:3b | 2.0 GB | standalone |

---

## Mirador / Agent System (9)

Models from the Reflexia/Mirador agent orchestration system.

| Model | Base | Size | Purpose |
|-------|------|------|---------|
| mirador_self_reflection_guardian | llama3.2:3b | 2.0 GB | Self-reflection loops |
| cross_model_synthesizer | llama3.2:3b | 2.0 GB | Multi-model synthesis |
| enhanced_agent_fast_v6 | llama3.2:3b | 2.0 GB | Fast agent responses |
| decision_enhancer | llama3.2:3b | 2.0 GB | Decision quality |
| decision_simplifier_v2 | llama3.2:3b | 2.0 GB | Decision simplification |
| digital_asset_curator | llama3.2:3b | 2.0 GB | Asset management |
| local_market_expert | llama3.2:3b | 2.0 GB | Local market analysis |
| universal_context_provider | llama3.2:3b | 2.0 GB | Context augmentation |
| linkedin_voice_architect | llama3.2:3b | 2.0 GB | LinkedIn content voice |

---

## Personal / Lifestyle (6)

| Model | Base | Size | Purpose |
|-------|------|------|---------|
| productivity_optimizer | llama3.2:3b | 2.0 GB | Productivity coaching |
| health_wellness_optimizer | llama3.2:3b | 2.0 GB | Health/wellness |
| performance_anxiety_coach | llama3.2:3b | 2.0 GB | Performance anxiety |
| touring_readiness_coach | llama3.2:3b | 2.0 GB | Tour preparation |
| financial_planning_expert_v6 | llama3.2:3b | 2.0 GB | Financial planning |
| financial_calculator | llama3.2:3b | 2.0 GB | Financial calculations |

---

## Validation / Training Pipeline (5)

| Model | Base | Size | Purpose |
|-------|------|------|---------|
| fact_validation_specialist | llama3.2:3b | 2.0 GB | Fact-checking |
| instruction_generation_specialist | llama3.2:3b | 2.0 GB | Training data generation |
| opportunity_identification_specialist | llama3.2:3b | 2.0 GB | Opportunity detection |
| louisville_expert_v2 | llama3.2:3b | 2.0 GB | Louisville v2 (superseded by louisville-job-market) |
| llama3.2_balanced | llama3.2:3b | 2.0 GB | Balanced config variant |

---

## Base Models (10)

Unmodified foundation models used as bases or for direct queries.

| Model | Size | Notes |
|-------|------|-------|
| llama3.2:3b | 2.0 GB | Primary base for custom models |
| llama3.2:1b | 1.3 GB | Lightweight variant |
| llama3.2:latest | 2.0 GB | Alias for 3b |
| llama3:latest | 4.7 GB | Previous generation |
| qwen2.5:7b | 4.7 GB | Base for domain experts |
| qwen2.5:1.5b | 986 MB | Lightweight qwen |
| qwen2.5-coder:7b | 4.7 GB | Code-focused qwen |
| qwen2.5-coder:32b | 19 GB | Large code model |
| phi3:mini | 2.2 GB | Base for quick-advisor |
| phi4:latest | 9.1 GB | Latest phi generation |
| codellama:7b | 3.8 GB | Base for code-executor |
| mistral:7b | 4.4 GB | General purpose |
| gemma2:9b | 5.4 GB | Google's model |
| glm4:9b | 5.5 GB | GLM foundation |
| deepseek-r1:7b | 4.7 GB | DeepSeek reasoning |
| deepseek-r1:14b | 9.0 GB | DeepSeek reasoning (larger) |
| yi:34b | 19 GB | Yi foundation |

---

## Storage Breakdown

| Category | Models | Approx Size |
|----------|--------|-------------|
| Career & Job Search | 3 | ~6 GB |
| Dev Tools | 3 | ~10 GB |
| Design & Frontend | 3 | ~14 GB |
| Domain Experts | 19 | ~89 GB |
| CoT Specialists | 11 | ~22 GB |
| Creative & Music | 7 | ~20 GB |
| Client & Prospecting | 1 | ~2 GB |
| Utility & Quick | 2 | ~4 GB |
| Mirador / Agent | 9 | ~18 GB |
| Personal / Lifestyle | 6 | ~12 GB |
| Validation / Training | 5 | ~10 GB |
| Base Models | 17 | ~95 GB |
| **Total** | **86** | **~280 GB** |

---

## Command/Skill Dependency Map

| Command/Skill | Models Required |
|---------------|----------------|
| /coach | matthew-career-coach |
| /louisville | louisville-job-market |
| /tactic | barrier-breaker |
| /code | code-executor |
| /analyze | data-analyzer-qwen |
| /quick | quick-advisor-phi |
| /humanize | humanizer |
| /consult | 19 domain expert models (queries relevant subset) |
| resume-customizer | matthew-career-coach, louisville-job-market |
| cover-letter-generator | matthew-career-coach, louisville-job-market |
| interview-prep-auto | matthew-career-coach, louisville-job-market, barrier-breaker |
| prospect | client-prospector |
| oracle-query-pattern | design-oracle, design-system-atlas, elite-frontend |

---

## Management

```bash
# List all models
ollama list

# Check model details
ollama show matthew-career-coach

# Run a model directly
ollama run matthew-career-coach "What are my strongest skills?"

# Remove a model (recovers disk space)
ollama rm model-name

# Pull/update a base model
ollama pull llama3.2:3b
```

---

## Related

- **Command Manifest:** `~/.claude/COMMAND_MANIFEST.md` (which commands use which models)
- **Reflexia Model Manager:** `~/Projects/reflexia-model-manager/` (CLI for model management)
- **Automation Scripts Index:** `~/.claude/reference/automation-scripts-index.md`
