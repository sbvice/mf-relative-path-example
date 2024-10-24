const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Route to serve all micro-frontend modules from their dist folder
app.get('/module/:moduleName/*', (req, res) => {
  const moduleName = req.params.moduleName;
  const requestedFilePath = req.params[0] || '';
  const filePath = path.join(__dirname, `../modules/${moduleName}/dist/${requestedFilePath}`);
  console.log(`Serving ${filePath}`);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Static asset server is running on http://localhost:${PORT}`);
});