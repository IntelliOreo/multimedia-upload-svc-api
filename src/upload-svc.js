require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const multer = require('multer'); // https://www.npmjs.com/package/multer
const cors = require('cors'); // https://www.npmjs.com/package/cors
const port = process.env.PORT;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/vault/'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = new Date().toDateString().replace(/\s/g, '-');
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10240 }
})

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/vault/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res, next) => {
  res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="topSecret"/>
  <input type="text" />
  <input type="submit" value="submit" /> 
</form>`);
});
app.post('/upload', upload.single("topSecret"), (req, res) => {
  console.log('req', req);
  console.log('req', req.body);
  res.json('uploaded');
})
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
