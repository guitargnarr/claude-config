---
name: prospect
description: Analyze potential web development client leads using client-prospector model
arguments: Business description or prospect details
---

# Client Prospect Analysis

Analyze potential web development clients for Louisville-based services.

## Usage
Pipe the user's arguments to the client-prospector Ollama model:

```bash
echo "$ARGUMENTS" | ollama run client-prospector
```

## Model Details
- **Base:** llama3.2
- **Parameters:** temp=0.7, top_p=0.85, ctx=4096
- **Scoring:** 1-10 based on web presence gap, business fit, location, revenue potential
- **Tiers:** Essential ($500-1K), Professional ($1-3K), Advanced ($3-5K), Enterprise ($5-10K+)

## Example Inputs
- "Louisville coffee shop, no website, just opened"
- "Dental practice in St. Matthews, outdated site from 2015"
- "Wedding venue, Facebook only, doing 50+ events/year"
