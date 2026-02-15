# Fix 30 CodeQL Alerts

## Changes (15 files)

1. **22x bare `except:` → `except Exception:`** across 13 files
2. **1x empty except** - add `except Exception:` + comment (analyze_ollama_models.py)
3. **1x file-not-closed** - use `with` statement (create_import_migration.py:138)
4. **1x illegal-raise** - investigate; may already be correct (create_error_handler.py:95)
5. **2x unreachable code** - remove dead `elif` blocks (framework.py:204-206, mirador.py:240-242)

## Files
- analyze_ollama_models.py
- src/ai_framework/framework.py
- src/dashboard/mirador_unified_dashboard.py
- src/misc/compare_directories.py
- src/misc/create_import_migration.py
- src/misc/framework.py
- src/misc/launch_advocates.py
- src/misc/mirador.py
- src/misc/quality_assurance.py
- src/utils/mirador_model_analyzer.py
- src/utils/school_transfer_tracker_v2.py
- tests/test_models.py
- tools/diagnostics/mirador_action_prioritizer.py
- tools/diagnostics/mirador_model_analyzer.py
- tools/productivity/create_error_handler.py
- tools/productivity/feedback_collector.py
- tools/productivity/mirador_integration.py
- tools/productivity/star_ratings_analyzer.py
- tools/productivity/test_framework.py

## Verification
- Run `gh api repos/guitargnarr/mirador/code-scanning/alerts --jq '[.[] | select(.state=="open")] | length'` after CodeQL re-runs to confirm 0 open alerts
