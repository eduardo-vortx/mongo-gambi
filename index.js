const { MongoClient } = require('mongodb');
const fs = require('fs');

const url =
  ''

const client = new MongoClient(url);

// Database Name
const dbName = 'VxLogin';

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('User');

  console.log('1- Busca usuarios que tenham a flag desejada');
  const usuarios = await collection
    .find({
      $and: [
        { 'products.product_name': 'Vórtx One' },
        { 'products.is_active': true },
        { company: { $ne: null } },
      ],
    })
    .map((doc) => doc._id)
    .toArray();

  const ids = usuarios.map((u) => `"${ToGUID(u.toString('hex'))}"\n`).join();

  console.log('2- Grava os Ids retornados em um arquivo txt');
  var fs = require('fs');
  fs.writeFile('Ids.txt', ids, 'utf8', () => {});

  return 'Done';
}

function ToGUID(hex) {
  var a =
    hex.substr(6, 2) + hex.substr(4, 2) + hex.substr(2, 2) + hex.substr(0, 2);
  var b = hex.substr(10, 2) + hex.substr(8, 2);
  var c = hex.substr(14, 2) + hex.substr(12, 2);
  var d = hex.substr(16, 16);
  hex = a + b + c + d;
  var uuid =
    hex.substr(0, 8) +
    '-' +
    hex.substr(8, 4) +
    '-' +
    hex.substr(12, 4) +
    '-' +
    hex.substr(16, 4) +
    '-' +
    hex.substr(20, 12);
  return uuid;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
