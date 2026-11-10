#!/bin/bash
# Claude Code PreToolUse hook (matcher: Bash). Blocks a push or merge to main unless the gate has passed
# for the current commit. Exit 2 blocks; stderr is the reason the agent sees. Fails closed.
input=$(cat)
cmd=$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null) || { echo "gate hook could not read the command" >&2; exit 2; }
case "$cmd" in
  *"push"*"main"*|*"pulls/"*"/merge"*|*"gh pr merge"*) ;;
  *) exit 0 ;;
esac
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
stamp="$root/_agent/harness/.gate-pass"
head=$(git -C "$root" rev-parse HEAD)
if [ -f "$stamp" ] && [ "$(cat "$stamp")" = "$head" ]; then exit 0; fi
echo "Publish blocked: run python3 _agent/scripts/gate.py for commit $head first (it writes the pass stamp)." >&2
exit 2
