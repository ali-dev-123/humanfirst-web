const fs = require('node:fs')
const path = require('node:path')

const DIST_DIR = path.resolve(__dirname, '..', 'dist')
const SITE_URL = 'https://humanf1rst.app'
const OG_IMAGE_URL = `${SITE_URL}/human-first-logo.png`

const routes = [
  {
    path: '/',
    title: 'Human > AI. | HumanFirst',
    description:
      'Verified integrity. Zero surveillance. HumanFirst proves student work is genuinely human — without cameras, keystroke logging, or a single frame of video ever leaving the device.',
    robots: 'index, follow',
  },
  {
    path: '/about',
    title: 'About HumanFirst — Rebuilding Trust in Education',
    description:
      'HumanFirst exists to help institutions preserve academic integrity in an AI-driven world — without sacrificing student privacy or trust. Learn our story, principles, and vision.',
    robots: 'index, follow',
  },
  {
    path: '/contact',
    title: 'Contact | HumanF1RST',
    description: 'Get in touch with HumanF1RST.',
    robots: 'index, follow',
  },
  {
    path: '/login',
    title: 'Login | HumanF1RST',
    description: 'Sign in to your HumanF1RST account.',
    robots: 'noindex, nofollow',
  },
  {
    path: '/signup',
    title: 'Sign Up | HumanF1RST',
    description: 'Create your HumanF1RST account.',
    robots: 'noindex, nofollow',
  },
  {
    path: '/forgot-password',
    title: 'Forgot Password | HumanF1RST',
    description: 'Reset your HumanF1RST account password.',
    robots: 'noindex, nofollow',
  },
  {
    path: '/reset-email-sent',
    title: 'Check Your Email | HumanF1RST',
    description: 'Password reset email sent to your inbox.',
    robots: 'noindex, nofollow',
  },
  {
    path: '/reset-password',
    title: 'Create New Password | HumanF1RST',
    description: 'Set your new HumanF1RST account password.',
    robots: 'noindex, nofollow',
  },
  {
    path: '/password-changed',
    title: 'Password Updated | HumanF1RST',
    description: 'Your password has been successfully updated.',
    robots: 'noindex, nofollow',
  },
]

const notFound = {
  path: null,
  title: '404 — Page Not Found | HumanF1RST',
  description: 'The page you are looking for does not exist.',
  robots: 'noindex, nofollow',
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function replaceMeta(html, attribute, key, content) {
  const escapedContent = escapeHtml(content)
  const pattern = new RegExp(
    `<meta\\s+${attribute}=["']${key}["'][^>]*>`,
    'i'
  )
  const replacement = `<meta ${attribute}="${key}" content="${escapedContent}" />`
  return html.replace(pattern, replacement)
}

function replacePropertyMeta(html, key, content) {
  return replaceMeta(html, 'property', key, content)
}

function replaceNameMeta(html, key, content) {
  return replaceMeta(html, 'name', key, content)
}

function replaceCanonical(html, canonicalUrl) {
  return html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  )
}

function createRouteHtml(template, route) {
  const canonicalUrl = route.path === null
    ? null
    : `${SITE_URL}${route.path === '/' ? '/' : route.path}`
  let html = template

  html = html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(route.title)}</title>`)
  html = replaceNameMeta(html, 'description', route.description)
  html = replaceNameMeta(html, 'robots', route.robots)
  html = replacePropertyMeta(html, 'og:title', route.title)
  html = replacePropertyMeta(html, 'og:description', route.description)
  if (canonicalUrl) {
    html = replacePropertyMeta(html, 'og:url', canonicalUrl)
  } else {
    html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, '')
  }
  html = replacePropertyMeta(html, 'og:type', 'website')
  html = replacePropertyMeta(html, 'og:image', OG_IMAGE_URL)
  html = replaceNameMeta(html, 'twitter:title', route.title)
  html = replaceNameMeta(html, 'twitter:description', route.description)
  html = replaceNameMeta(html, 'twitter:image', OG_IMAGE_URL)
  if (canonicalUrl) {
    html = replaceCanonical(html, canonicalUrl)
  } else {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, '')
  }

  return html
}

function writeRoute(template, route) {
  const outputDirectory = route.path === '/'
    ? DIST_DIR
    : path.join(DIST_DIR, route.path.slice(1))
  fs.mkdirSync(outputDirectory, { recursive: true })
  fs.writeFileSync(path.join(outputDirectory, 'index.html'), createRouteHtml(template, route))
}

const template = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8')

for (const route of routes) {
  writeRoute(template, route)
}

fs.writeFileSync(path.join(DIST_DIR, '404.html'), createRouteHtml(template, notFound))
