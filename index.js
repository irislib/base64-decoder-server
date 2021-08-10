const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  const s = req.query.s;
  if (s) {
    const split = s.split(';base64,');
    if (split.length < 2) { return res.send('') }
    const type = split[0].replace('data:', '');
	  const imageStr = split[1];
    const img = Buffer.from(imageStr, 'base64');
    res.status(200);
    res.set({
       'Content-Type': type,
       'Content-Length': img.length,
       'Content-Disposition': 'inline'
    });
    res.end(img);
  } else {
    res.end('hi');
  }
});

app.use(express.static('public'));

app.listen(PORT);

console.log('Listening on port', PORT);
