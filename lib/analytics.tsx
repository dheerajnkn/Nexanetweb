import Script from 'next/script'

/**
 * Loads a privacy-friendly, cookie-less analytics script only when
 * NEXT_PUBLIC_ANALYTICS_DOMAIN is configured. No script — and no request
 * to a third party — happens without that env var set.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN
  if (!domain) return null

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}
