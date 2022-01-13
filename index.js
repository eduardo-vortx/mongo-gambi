const { MongoClient } = require('mongodb')
const fs = require('fs')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  ''

const client = new MongoClient(url)

// Database Name
const dbName = 'VxLogin'

async function main() {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  const collection = db.collection('User')

  const usuarios = await collection
    .find({
      //   email: 'pfh@vortx.com.br',
      $and: [
        { 'products.product_name': 'Vórtx One' },
        { 'products.is_active': true },
        { company: { $ne: null } },
      ],
    })
    .map((doc) => doc._id)
    .toArray()

  console.log()

  const ids = JSON.stringify(
    usuarios.map((u) => `"${ToGUID(u.toString('hex'))}"`).join()
  )

  var fs = require('fs')
  fs.writeFile('myjsonfile.json', ids, 'utf8', () => {})

  // the following code examples can be pasted here...

  return 'done.'
}

function ToGUID(hex) {
  var a =
    hex.substr(6, 2) + hex.substr(4, 2) + hex.substr(2, 2) + hex.substr(0, 2)
  var b = hex.substr(10, 2) + hex.substr(8, 2)
  var c = hex.substr(14, 2) + hex.substr(12, 2)
  var d = hex.substr(16, 16)
  hex = a + b + c + d
  var uuid =
    hex.substr(0, 8) +
    '-' +
    hex.substr(8, 4) +
    '-' +
    hex.substr(12, 4) +
    '-' +
    hex.substr(16, 4) +
    '-' +
    hex.substr(20, 12)
  return uuid
}

// console.log(ToGUID('5118218e35c18141b983bf20e26b020f'))

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
