const { createSecureHeaders } = require('next-secure-headers')
// const withPWA = require('next-pwa')
// const prod = process.env.NODE_ENV === 'production'

// module.exports = withPWA({
module.exports = {
  // X-Powered-Byヘッダを削除
  poweredByHeader: false,
  // next/imageのsrcとして許可する外部ドメイン
  images: {
    domains: ['images.microcms-assets.io'],
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
  // net-pwa | https://github.com/GoogleChrome/workbox/issues/1790#issuecomment-620894023
  // pwa: {
  //   disable: prod ? false : true,
  //   dest: 'public',
  // },
}
