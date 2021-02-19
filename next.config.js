const { createSecureHeaders } = require('next-secure-headers')
const withPWA = require('next-pwa')

module.exports = withPWA({
  /* X-Powered-By ヘッダを削除 */
  poweredByHeader: false,

  /* next-secure-headers | https://github.com/jagaapple/next-secure-headers */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders(),
      },
    ]
  },

  /* next/image の設定 */
  images: {
    domains: ['localhost', 'images.microcms-assets.io'],
  },

  /* net-pwa の設定 */
  pwa: {
    /* sw の出力ディレクトリ */
    dest: 'public',
    // runtimeCaching: []
  },
})
