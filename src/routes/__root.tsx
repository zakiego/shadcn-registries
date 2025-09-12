import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Shadcn Registries',
      },
      {
        name: 'description',
        content:
          'Browse Shadcn UI community registries. Click a card to open the registry homepage.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Shadcn Registries' },
      {
        property: 'og:description',
        content:
          'Browse Shadcn UI community registries. Click a card to open the registry homepage.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Shadcn Registries' },
      {
        name: 'twitter:description',
        content:
          'Browse Shadcn UI community registries. Click a card to open the registry homepage.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
