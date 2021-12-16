const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './util/.env') })
const KaastibotClient = require('./structures/KaastibotClient');

let client = new KaastibotClient({
  prefix: '.'
});

client.login(process.env.TOKEN)