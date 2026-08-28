import path from 'path'

const require = (await import('module')).createRequire(import.meta.url)
const reactDir = path.dirname(require.resolve('react/package.json'))
const reactDomDir = path.dirname(require.resolve('react-dom/package.json'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['app', 'components', 'content', 'lib'],
  },
  webpack: (config, { isServer }) => {
    // Force a single resolved copy of react/react-dom in the CLIENT bundle
    // only. Without this, react-reconciler (used internally by
    // @react-three/fiber) can end up reading React internals off a
    // different React instance than the app uses, throwing
    // "Cannot read properties of undefined (reading 'ReactCurrentOwner'/
    // 'ReactCurrentBatchConfig')" at runtime. Scoped to the client build
    // because the server/RSC bundle needs Next's own React fork (it ships
    // APIs like `cache()` the public react package doesn't have).
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: reactDir,
        'react-dom': reactDomDir,
      }
    }
    return config
  },
}

export default nextConfig
