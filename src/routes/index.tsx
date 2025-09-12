import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const DATA_URL =
  'https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/public/r/registries.json'

type Registry = {
  name: string
  template: string
  href: string // homepage
}

// Map specific registry origins to a more helpful homepage URL
const HOMEPAGE_OVERRIDES: Record<string, string> = {
  'https://registry.ai-sdk.dev': 'https://ai-sdk.dev/elements/overview',
}

async function loadRegistries(): Promise<Registry[]> {
  const res = await fetch(DATA_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = (await res.json()) as Record<string, string>
  return Object.entries(data)
    .map(([name, template]) => {
      const origin = new URL(template).origin
      const href = HOMEPAGE_OVERRIDES[origin] ?? origin + '/'
      return { name, template, href }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export const Route = createFileRoute('/')({
  loader: () => loadRegistries(),
  component: IndexPage,
  pendingComponent: IndexPending,
  errorComponent: IndexError,
})

function IndexPage() {
  const registries = Route.useLoaderData() as Registry[]
  const [query, setQuery] = React.useState('')

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return registries
    return registries.filter((r) => {
      const host = (() => {
        try {
          return new URL(r.href).hostname
        } catch {
          return ''
        }
      })()
      return (
        r.name.toLowerCase().includes(q) ||
        r.template.toLowerCase().includes(q) ||
        host.toLowerCase().includes(q)
      )
    })
  }, [registries, query])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2 text-center">Shadcn Registries</h1>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Click a registry to open an example endpoint in a new tab.
      </p>

      <div className="mb-6 flex items-center justify-center">
        <Badge asChild variant="outline">
          <a
            href={DATA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open source JSON in a new tab"
          >
            Source JSON
          </a>
        </Badge>
      </div>

      <div className="max-w-md mx-auto mb-6">
        <Input
          placeholder="Search registries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">No results.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${r.name} homepage`}
              className="block hover:no-underline"
            >
              <Card className="h-full transition-transform hover:shadow-md hover:-translate-y-0.5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold break-all">
                    {r.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <code className="text-xs text-muted-foreground break-all">
                    {r.template}
                  </code>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function IndexPending() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2 text-center">Shadcn Registries</h1>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Loading registries…
      </p>
      <div className="mb-6 flex items-center justify-center">
        <Badge asChild variant="outline">
          <a
            href={DATA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open source JSON in a new tab"
          >
            Source JSON
          </a>
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

function IndexError({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2 text-center">Shadcn Registries</h1>
      <Alert className="mb-6" variant="destructive">
        <AlertTitle>Failed to load registries</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <div className="flex items-center justify-center">
        <Badge asChild variant="outline">
          <a
            href={DATA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open source JSON in a new tab"
          >
            Source JSON
          </a>
        </Badge>
      </div>
    </div>
  )
}
