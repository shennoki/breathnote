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
        '"BIZ UDPGothic"',
        'メイリオ',
        'Meiryo',
        'monospace',
      ],
    },
    colors: {
      clearness: 'transparent',
      accent: {
        light: '#ca2d1d',
        dark: '#ebcb8b',
        'hover-light': '#88c0d0',
        'hover-dark': '#a3be8c',
      },
      night: {
        100: '#4c566a',
        200: '#434c5e',
        300: '#3b4252',
        400: '#2e3440',
        500: '#22262F',
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
      shadow: {
        light: '#D9E0EA',
        dark: '#373E4C',
      },
      code: {
        bg: {
          light: '#e9ecf1',
          dark: '#2c313e',
        },
        gray: {
          light: '#79869e',
          dark: '#a7b5cc',
        },
        red: {
          light: '#D90A27',
          dark: '#ffa9bb',
        },
        blue: {
          light: '#1990b8',
          dark: '#7ec6fd',
        },
        yellow: {
          light: '#d88c00',
          dark: '#ebcb8b',
        },
        green: {
          light: '#2f9c0a',
          dark: '#d1ffb6',
        },
        orange: {
          light: '#d88c00',
          dark: '#eead83',
        },
        purple: {
          light: '#A4047C',
          dark: '#cc99cd',
        },
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
        light: '3px 3px 6px #d9dce0, -3px -3px 6px #ffffff',
        dark: '5px 5px 2px 2px #21252d',
        'inset-light': 'inset -1.5px -1.5px 3px hsl(0deg 0% 100% / 95%), inset 1px 1px 4px rgb(28 64 128 / 15%)',
        'inset-dark': 'inset 8px 8px 2px #21252d',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.night.200'),
            a: {
              padding: '0 .2em',
              color: theme('colors.accent.light'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h2: {
              color: theme('colors.night.200'),
              fontSize: '1.4em !important',
              '&::first-letter': {
                color: theme('colors.accent.light'),
                fontSize: '1.1em',
              },
            },
            h3: {
              color: theme('colors.night.200'),
              fontSize: '1.3em !important',
            },
            h4: {
              color: theme('colors.night.200'),
              fontSize: '1.2em !important',
            },
            h5: {
              color: theme('colors.night.200'),
              fontSize: '1.1em !important',
            },
            th: {
              color: theme('colors.night.200'),
            },
            strong: {
              color: theme('colors.night.200'),
            },
            code: {
              color: theme('colors.night.200'),
              letterSpacing: 'normal',
            },
            figcaption: {
              color: theme('colors.night.200'),
            },
            blockquote: {
              color: theme('colors.night.200'),
              p: {
                '&::before': {
                  padding: '0 .3em',
                },
                '&::after': {
                  padding: '0 .3em',
                },
              },
            },
            hr: {
              borderColor: theme('colors.night.200'),
            },
            ul: {
              li: {
                color: theme('colors.night.200'),
                display: 'table',
                '&::before': {
                  backgroundColor: theme('colors.night.200'),
                },
                a: {
                  margin: '0 !important',
                  display: 'block',
                },
              },
            },
            ol: {
              li: {
                color: theme('colors.night.200'),
                '&::before': {
                  color: theme('colors.night.200'),
                },
                a: {
                  margin: '0 !important',
                },
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.snow.100'),
            a: {
              color: theme('colors.accent.dark'),
            },
            h2: {
              color: theme('colors.snow.100'),
              '&::first-letter': {
                color: theme('colors.accent.dark'),
              },
            },
            h3: {
              color: theme('colors.snow.100'),
            },
            h4: {
              color: theme('colors.snow.100'),
            },
            h5: {
              color: theme('colors.snow.100'),
            },
            th: {
              color: theme('colors.snow.100'),
            },
            strong: {
              color: theme('colors.snow.100'),
            },
            code: {
              color: theme('colors.snow.100'),
            },
            figcaption: {
              color: theme('colors.snow.100'),
            },
            blockquote: {
              color: theme('colors.snow.100'),
            },
            hr: {
              borderColor: theme('colors.snow.100'),
            },
            ul: {
              li: {
                color: theme('colors.snow.100'),
                '&::before': {
                  backgroundColor: theme('colors.snow.100'),
                },
              },
            },
            ol: {
              li: {
                color: theme('colors.snow.100'),
                '&::before': {
                  color: theme('colors.snow.100'),
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
      borderColor: ['dark'],
      boxShadow: ['dark'],
      animation: ['hover'],
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
