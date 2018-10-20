const express = require("express")
const { parse } = require('url')
const next = require('next')
const fileUpload = require('express-fileupload')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const nextHandle = app.getRequestHandler()

app.prepare().then(() => {

  const server = express();
  server.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }))

  server.post("/api/v1/upload", (req, res) => {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    console.log(req.files)
    res.send('File uploaded!');
  })

  server.use('/monaco-editor-external', express.static(`${__dirname}/.monaco-dist`))

  server.get("*", nextHandle)

  const port = 3000
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`)
  })
})


