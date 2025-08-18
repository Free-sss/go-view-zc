const fs = require('fs')
const path = require('path')
const binPath = path.resolve(__dirname, 'node_modules/.bin')

fs.readdir(binPath, (err, files) => {
  files.forEach(file => {
    if (file.endsWith('.cmd')) {
      const filePath = path.join(binPath, file)
      let content = fs.readFileSync(filePath, 'utf8')
      content = content.replace(/"%_prog%"/g, '%_prog%')
      fs.writeFileSync(filePath, content)
    }
  })
})
