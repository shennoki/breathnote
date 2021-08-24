const { createSecureHeaders } = require('next-secure-headers')
const withPWA = require('next-pwa')

module.exports = withPWA({
  // X-Powered-Byヘッダを削除
  poweredByHeader: false,

  // next/imageのsrcとして許可するドメイン
  images: {
    domains: ['blog.shinki.net', 'images.microcms-assets.io'],
  },

  // next-secure-headers | https://github.com/jagaapple/next-secure-headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders(),
      },
    ]
  },

  // next-pwa | https://github.com/GoogleChrome/workbox/issues/1790#issuecomment-620894023
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    publicExcludes: ['!img/**/*'],
    buildExcludes: [/chunks\/images\/.*$/],
  },
})
