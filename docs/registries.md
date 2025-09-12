## Registries Index

- Data source: `https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/public/r/registries.json`
- Shape: `Record<string, string>` where key is the registry (e.g. `@shadcn-editor`) and value is a URL template containing `{name}`.

### UI Behavior

- Index page fetches and lists registries as cards.
- Card shows the registry key and the template URL.
- Card is a single clickable link to the registry homepage (origin of the template URL).
- Search input filters by registry name, template URL, or hostname.
- Responsive grid: 1/2/3/4 columns across breakpoints.

### Files

- `src/routes/index.tsx`: Fetch + render cards.
- `src/components/Header.tsx`: Simplified to only show Home.

### Future Enhancements

- Copy template URL.
- Choose sample `{name}` (default `button`).
