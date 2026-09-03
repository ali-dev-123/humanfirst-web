import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SeoProps {
  title: string
  description: string
  noindex?: boolean
}

const SITE_URL = 'https://humanf1rst.app'
const OG_IMAGE_URL = `${SITE_URL}/human-first-logo.png`

function setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let meta = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function Seo({ title, description, noindex = false }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    document.title = title

    setMeta('description', description)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonicalUrl, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', 'HumanFirst', 'property')
    setMeta('og:image', OG_IMAGE_URL, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', OG_IMAGE_URL)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    let structuredData = document.head.querySelector('script[data-seo-schema]')
    if (!structuredData) {
      structuredData = document.createElement('script')
      structuredData.setAttribute('type', 'application/ld+json')
      structuredData.setAttribute('data-seo-schema', '')
      document.head.appendChild(structuredData)
    }
    structuredData.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'HumanFirst',
        url: SITE_URL,
        logo: OG_IMAGE_URL,
        description,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'HumanFirst',
        url: SITE_URL,
        description,
      },
    ])
  }, [description, noindex, pathname, title])

  return null
}

export default Seo