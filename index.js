const postcss = require('postcss')
const palx = require('palx')

function colorSchemeCss() {
  const baseColor = '#2980dd',
        colorScheme = palx(baseColor)

  let css = ''


  for(hue in colorScheme) {
    if(hue != 'base' && hue != 'black') {
      colorScheme[hue].forEach((shade, i) => {
        css += `  --${hue}-${i}: ${shade};\n`
      })

      css += '\n'
    }
  }


  css = `:root {
  --base-color: ${colorScheme.base};
  --black: ${colorScheme.black};
${css}}`

  return css
}

module.exports = postcss.plugin('color-scheme', (options = {}) => {
  return root => {
    root.walkAtRules(rule => {
      if(rule.name == 'color-scheme') rule.replaceWith(colorSchemeCss())
    });
  };
});
