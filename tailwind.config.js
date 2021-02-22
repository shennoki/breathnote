/* tailwindcss | https://tailwindcss-ja.entap.app/docs/configuration */

module.exports = {
  purge: ['./src/**/*.{jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '556px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      sans: [
        '"Helvetica Neue"',
        'Arial',
        '"Hiragino Sans"',
        '"Hiragino Kaku Gothic ProN"',
        '"BIZ UDPGothic"',
        'Meiryo',
        '"sans-serif"',
      ],
      serif: [
        '"ヒラギノ明朝 ProN W3"',
        '"Hiragino Mincho ProN"',
        '"BIZ UDPMincho"',
        '"游明朝"',
        'YuMincho',
        '"HG明朝E"',
        'serif',
      ],
      mono: [
        '"SFMono-Regular"',
        'Menlo',
        'Consolas',
        '"Bitstream Vera Sans Mono"',
        '"Courier New"',
        'Courier',
        '"BIZ UDGothic"',
        'メイリオ',
        'Meiryo',
        'monospace',
      ],
    },
    extend: {
      colors: {
        neumo: '#ebecf0',
        accent: '#d11e00',
        'pre-bg': '#141a23',
        twitter: '#1DA1F2',
        facebook: '#1877F2',
        line: '#00C300',
        hatena: '#00A4DE',
        pocket: '#EF3F56',
      },
      boxShadow: {
        neumo: '3px 3px 6px #c8c9cc, -3px -3px 6px #fff',
        'neumo-dark': '3px 3px 6px #161d27, -3px -3px 6px #283547',
        inset: 'inset 1px 1px 3px #b8b9be,inset -3px -3px 7px #fff',
        'inset-dark': 'inset 5px 5px 17px #11171e, inset -5px -5px 17px #2d3b50',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h2: {
              fontSize: '1.3em !important',
              marginBottom: '1.2em !important',
            },
            h3: {
              fontSize: '1.2em !important',
              marginBottom: '1.2em !important',
            },
            h4: {
              fontSize: '1.1em !important',
              marginBottom: '1.2em !important',
            },
            a: {
              color: theme('colors.accent'),
              '&:hover': {
                color: theme('colors.red.400'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.neumo'),
            a: {
              color: theme('colors.yellow.300'),
              '&:hover': {
                color: theme('colors.yellow.100'),
              },
            },
            'h2 a': {
              color: theme('colors.neumo'),
            },
            h1: {
              color: theme('colors.neumo'),
            },
            h2: {
              color: theme('colors.neumo'),
            },
            h3: {
              color: theme('colors.neumo'),
            },
            h4: {
              color: theme('colors.neumo'),
            },
            h5: {
              color: theme('colors.neumo'),
            },
            h6: {
              color: theme('colors.neumo'),
            },
            th: {
              color: theme('colors.neumo'),
            },
            strong: {
              color: theme('colors.neumo'),
            },
            code: {
              color: theme('colors.neumo'),
            },
            figcaption: {
              color: theme('colors.neumo'),
            },
            blockquote: {
              color: theme('colors.neumo'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      boxShadow: ['dark'],
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
