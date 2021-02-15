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
      },
      boxShadow: {
        toggle: '3px 3px 6px #c8c9cc, -3px -3px 6px #fff',
        'toggle-dark': '3px 3px 6px #161d27, -3px -3px 6px #283547',
        article: '5px 5px 10px #c8c9cc, -5px -5px 10px #fff',
        'article-dark': '5px 5px 10px #18202a, -5px -5px 10px #263244',
        inset: 'inset 1px 1px 3px #b8b9be,inset -3px -3px 7px #fff',
        'inset-dark': 'inset 5px 5px 17px #11171e, inset -5px -5px 17px #2d3b50',
      },
      typography: (theme) => ({
        DEFAULT: {},
        dark: {
          css: {
            color: theme('colors.neumo'),
            a: {
              color: theme('colors.neumo'),
              '&:hover': {
                color: theme('colors.neumo'),
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
      typography: ['dark'],
      boxShadow: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
