const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dataFilePath = path.resolve(__dirname, '..', process.env.DATA_FILE || 'data/data.json');

function loadData() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ users: [], notes: [] }, null, 2));
  }
  const raw = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(raw);
}

function saveData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { loadData, saveData };
