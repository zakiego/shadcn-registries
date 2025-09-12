# Continuous Integration

This repository includes a scheduled GitHub Actions workflow that performs a daily commit to record a timestamp.

## Daily timestamp commit

- Schedule: Every day at 00:00 UTC
- Workflow: `.github/workflows/daily-timestamp.yml`
- Output file: `docs/last-updated.md`

Steps:

1. Check out the repository
2. Write the current UTC timestamp into `docs/last-updated.md`
3. Commit and push the change if there is a diff

You can also run it manually via the "Run workflow" button thanks to `workflow_dispatch`.
