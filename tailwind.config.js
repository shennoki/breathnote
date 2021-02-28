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
    colors: {
      neumo: '#ebecf0',
      night: {
        100: '#4c566a',
        200: '#434c5e',
        300: '#3b4252',
        400: '#2e3440',
      },
      snow: {
        100: '#eceff4',
        200: '#e5e9f0',
        300: '#d8dee9',
      },
      frost: {
        100: '#8fbcbb',
        200: '#88c0d0',
        300: '#81a1c1',
        400: '#5e81ac',
      },
      aurora: {
        red: '#bf616a',
        orange: '#d08770',
        yellow: '#ebcb8b',
        green: '#a3be8c',
        purple: '#b48ead',
      },
      sns: {
        twitter: '#1da1f2',
        facebook: '#1877f2',
        line: '#00c300',
        hatena: '#00a4de',
        pocket: '#ef3f56',
      },
    },
    extend: {
      boxShadow: {
        neumo: '3px 3px 6px #c8c9cc, -3px -3px 6px #fff',
        'neumo-dark': '3px 3px 6px #161d27, -3px -3px 6px #283547',
        inset: 'inset 1px 1px 3px #b8b9be,inset -3px -3px 7px #fff',
        'inset-dark': 'inset 5px 5px 17px #11171e, inset -5px -5px 17px #2d3b50',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.accent'),
              '&:hover': {
                color: theme('colors.red.400'),
              },
            },
            h2: {
              color: theme('colors.gray.800'),
              fontSize: '1.4em !important',
              marginBottom: '1.2em !important',
              '&::first-letter': {
                color: theme('colors.accent'),
                fontSize: '1.1em',
              },
            },
            h3: {
              color: theme('colors.gray.800'),
              fontSize: '1.3em !important',
              marginBottom: '1.2em !important',
            },
            h4: {
              color: theme('colors.gray.800'),
              fontSize: '1.2em !important',
              marginBottom: '1.2em !important',
            },
            h5: {
              color: theme('colors.gray.800'),
              fontSize: '1.1em !important',
              marginBottom: '1.2em !important',
            },
            th: {
              color: theme('colors.gray.800'),
            },
            strong: {
              color: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.gray.800'),
            },
            figcaption: {
              color: theme('colors.gray.800'),
            },
            blockquote: {
              color: theme('colors.gray.800'),
            },
            ul: {
              li: {
                color: theme('colors.gray.800'),
                display: 'table',
                a: {
                  marginTop: '0 !important',
                  marginBottom: '0 !important',
                  display: 'block',
                },
                '&::before': {
                  backgroundColor: theme('colors.gray.800'),
                },
              },
            },
            ol: {
              li: {
                color: theme('colors.gray.800'),
                '&::before': {
                  color: theme('colors.gray.800'),
                },
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
            h2: {
              color: theme('colors.neumo'),
              '&::first-letter': {
                color: theme('colors.yellow.300'),
                fontSize: '1.1em',
              },
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
            ul: {
              li: {
                color: theme('colors.neumo'),
                '&::before': {
                  backgroundColor: theme('colors.neumo'),
                },
              },
            },
            ol: {
              li: {
                color: theme('colors.neumo'),
                '&::before': {
                  color: theme('colors.neumo'),
                },
              },
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
