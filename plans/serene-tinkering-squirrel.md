# Plan: Transform Math Privacy Viz from Toy to Teaching Tool

## The Problem

The visualizer is impressive but passive. Someone looks at it, goes "cool", and leaves. Nothing anchors the math to reality, nothing tests understanding, nothing shows the *computation*.

## Three Changes That Matter

### 1. Real-World Scenarios (anchors "why should I care?")

Each act gets 3-4 named scenarios with preloaded parameters and context cards:

**Entropy scenarios:**
- "Weak PIN Attack" -- Distribution peaked at 1111. Entropy: ~0.5 bits. Attacker needs ~2 guesses.
- "Strong Password" -- Near-uniform. Entropy: ~2.9 bits. Attacker needs ~7,500 guesses.
- "Biased Dice" -- Slight peak. Shows how even small bias leaks information.

**Gini scenarios:**
- "Hospital Triage" -- Split patients into high/low risk. Bad split = wasted ICU beds.
- "Fraud Detection" -- Find the axis that cleanly separates fraud vs legit transactions.
- "Overfitting Danger" -- Split that looks perfect but captures noise.

**Bayes scenarios:**
- "Intrusion Detection" -- P(attack)=0.001, P(alert|attack)=0.95, P(alert)=0.05. Answer: only 1.9% chance of real attack. The shocking base-rate neglect problem.
- "COVID Test" -- Sensitivity/specificity/prevalence. Why mass testing creates false positives.
- "Spam Filter" -- High-confidence filtering: what priors make P(spam|flagged) > 90%?

**RSA scenarios:**
- "Small Message" -- Encrypt "42", see the math step by step.
- "Deterministic Weakness" -- Same plaintext always gives same ciphertext. Why padding matters.
- "Try to Crack It" -- User guesses factors of n=3233. Reveals p=61, q=53 on success.

**Implementation:** Each scenario is a data object with `{ name, context, params, insight, metrics }`. Selecting a scenario sets sliders + shows a glass-panel context card with the real-world framing.

### 2. Computation Trace (anchors "how does the math actually work?")

The equation panel currently shows `H = 2.456 bits`. That tells you nothing about *how*. Add an expandable step-by-step trace:

```
Step 1: Individual terms  -p(x) * log2(p(x))
  p1=0.35: -(0.35 * -1.515) = 0.530
  p2=0.25: -(0.25 * -2.000) = 0.500
  p3=0.15: -(0.15 * -2.737) = 0.411
  ...
Step 2: Sum all terms
  0.530 + 0.500 + 0.411 + ... = 2.456
Step 3: Result
  H(X) = 2.456 bits
```

Each util function gets a `*Steps()` variant that returns `ComputationStep[]`. A shared `ComputationTrace` component renders them with expand/collapse.

### 3. Challenge Mode (anchors "do I actually understand this?")

Active learning challenges with live feedback:

**Entropy challenges:**
- "Set entropy to exactly 2.5 bits" (tolerance: +/- 0.05)
- "Create a distribution where an attacker needs >100 guesses"

**Gini challenges:**
- "Find a split that reduces impurity below 0.15"
- "Which axis gives the cleanest split? Find it."

**Bayes challenges:**
- "An IDS fires. Set priors so P(real attack | alert) > 50%"
- "A COVID test is positive. When is P(infected | positive) < 10%?"

**RSA challenges:**
- "What are the prime factors of n=3233?" (input p and q)
- "Given ciphertext C=2557, what was the original message?"

Each challenge: target value, tolerance, live distance indicator, hint after 3 attempts, success feedback. Completion saved to localStorage.

---

## New Files (~1800 LOC total)

```
src/
  data/
    scenarios.ts          # All 12-16 scenarios for 4 acts (~200 lines)
    challenges.ts         # All 12-16 challenges for 4 acts (~200 lines)
  components/
    ComputationTrace.tsx  # Expandable step-by-step math display (~100 lines)
    ScenarioCard.tsx      # Real-world context card (~60 lines)
    ChallengePanel.tsx    # Challenge UI with progress/hints (~180 lines)
    ScenarioSelector.tsx  # Dropdown + preset buttons (~80 lines)
```

## Modified Files

```
src/utils/entropy.ts     # + shannonEntropySteps() (~30 lines)
src/utils/gini.ts        # + giniSteps() (~30 lines)
src/utils/bayes.ts       # + posteriorSteps() (~25 lines)
src/utils/rsa.ts         # + encryptSteps() already exists, add decryptSteps()
src/overlays/EquationPanel.tsx  # + "Show Steps" toggle, render ComputationTrace
src/scenes/ShannonEntropy.tsx   # + scenario/challenge integration
src/scenes/GiniImpurity.tsx     # + scenario/challenge integration
src/scenes/BayesTheorem.tsx     # + scenario/challenge integration
src/scenes/RSAEncryption.tsx    # + scenario/challenge integration
src/types/index.ts              # + Scenario, Challenge, ComputationStep types
```

## UI Layout (preserving aesthetics)

The right-side control panel currently has sliders. It expands to a tabbed panel:

```
[Explore] [Scenarios] [Challenge]

Explore tab:    Current sliders (unchanged)
Scenarios tab:  Preset buttons + context card + insight
Challenge tab:  Active challenge + progress bar + hints
```

Computation trace lives in the existing EquationPanel (bottom-left) with a "Show Steps" toggle.

## Build Sequence

1. Types + data files (scenarios.ts, challenges.ts, type definitions)
2. ComputationTrace component + step functions in utils
3. ScenarioCard + ScenarioSelector components
4. ChallengePanel component
5. Integrate into ShannonEntropy first (prove the pattern)
6. Roll out to other 3 scenes
7. Polish: localStorage persistence, mobile layout, transitions
8. Build + deploy + verify

## Verification

- `npm run build` passes clean
- Each act has working scenarios that load correct parameters
- Computation trace shows correct math for known inputs
- Challenges detect success within tolerance
- Challenge completion persists across page reloads
- Mobile: panels stack vertically, still usable
- Deploy to Vercel and screenshot all 4 acts
