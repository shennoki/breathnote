/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  SCRIPTS -> COLOR

  - 色に関する関数群

＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

const colorPalette = ['red', 'blue', 'yellow', 'green', 'pink', 'purple', 'indigo']

export const getRandomColor = (): string => {
  const color = colorPalette.shift() as string
  colorPalette.push(color)
  return color
}
