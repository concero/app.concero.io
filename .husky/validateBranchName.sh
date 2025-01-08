set -eu  

VALID_BRANCH_REGEX='^(master|release|feature\/.+|fix\/.+|hotfix\/.+)$'

ERROR_MESSAGE="🚫 Error: Invalid branch name.
Branch names must match:
  - master
  - release
  - feature/*
  - fix/*
  - hotfix/*
Current branch: '%s'
Please rename your branch and try again."

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

if ! echo "$BRANCH_NAME" | grep -Eq "$VALID_BRANCH_REGEX"; then
    printf "$ERROR_MESSAGE\n" "$BRANCH_NAME"
    exit 1
fi