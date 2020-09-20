const { Plugin } = require('powercord/entities')

module.exports = class OwoifyEverything extends Plugin {
  startPlugin() {
    this.owoObserver.observe(document.body, {
      childList: true,
      attributes: true,
      subtree: true
    })
  }

  owoObserver = new MutationObserver(() => this.walkText(document.body))

  faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^']

  walkText(node) {
    if (node.nodeType == 3) node.data = node.data
      .replace(/(?:r|l)/g, 'w')
      .replace(/(?:R|L)/g, 'W')
      .replace(/(n)([aeiou])/gi, '$1y$2')
      .replace(/ove/g, 'uv')
      .replace(/th/g, 'ff')
      .replace(/\!+/g, ' ' + this.faces[Math.floor(Math.random() * this.faces.length)] + ' ')

    if (node.nodeType == 1 && node.nodeName != 'SCRIPT' && node.getAttribute('contenteditable') !== "true") {
      for (var i = 0; i < node.childNodes.length; i++) {
        this.walkText(node.childNodes[i]);
      }
    }
  }

  pluginWillUnload() {
    this.owoObserver.disconnect()
  }
};