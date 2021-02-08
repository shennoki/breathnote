const { createSecureHeaders } = require('next-secure-headers')

module.exports = {
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
}
