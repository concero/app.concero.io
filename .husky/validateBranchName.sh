#!/usr/bin/env sh
set -euo pipefail  # Enforce safe scripting practices
# Configuration: Define valid and forbidden branches
VALID_BRANCH_REGEX='^(feature\/.+|fix\/.+|hotfix\/.+|master)$'
FORBIDDEN_BRANCHES='^(release)$'
# Error messages
INVALID_BRANCH_ERROR="🚫 Error: Invalid branch name detected.
Branch names must follow the pattern:
  - feature/anything
  - fix/anything
  - hotfix/anything
  - master
Current branch: '%s'
Please rename your branch and try again."
FORBIDDEN_BRANCH_ERROR="🚫 Error: You are not allowed to commit on the '%s' branch.
The following branches are restricted:
  - release
Please switch to an appropriate branch and try again."
# Helper function: Print error messages
print_error() {
    printf "%b\n" "$1"
    exit 1
}
# Main function: Validate branch name
validate_branch_name() {
    local branch_name="$1"
    # Check if branch is forbidden
    if echo "$branch_name" | grep -Eq "$FORBIDDEN_BRANCHES"; then
        print_error "$(printf "$FORBIDDEN_BRANCH_ERROR" "$branch_name")"
    fi
    # Check if branch name is valid
    if ! echo "$branch_name" | grep -Eq "$VALID_BRANCH_REGEX"; then
        print_error "$(printf "$INVALID_BRANCH_ERROR" "$branch_name")"
    fi
}
# Execute validation
validate_branch_name "$1"
