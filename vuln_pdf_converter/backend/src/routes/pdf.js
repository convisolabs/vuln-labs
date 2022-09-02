const express = require("express");
const htmlPdf = require('html-pdf');

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { body, links } = req.body;
    links.forEach(({ name, uri }) => {
      const tag = "{{" + name + "}}";
      body = body.replace(tag, uri)
        .replace('{{path}}', `file://../../../../etc/passwd`);
      // body = body.replace(tag, `file://${require.resolve("../../../../etc/passwd")}`);
    });
    htmlPdf.create(body, { width: '50mm', height: '90mm', phantomArgs: ['--web-security=no', '--local-url-access=true'] }).toStream((err, stream) => {
      if (err) return res.end(err.stack)
      res.setHeader('Content-type', 'application/pdf')
      stream.pipe(res)
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
