const express = require('express');
const app = express();

app.use(express.static('dist'));

app.listen(5700, () => console.log('\n\nROGER\nROGER\nListening on port :5700:\n'));