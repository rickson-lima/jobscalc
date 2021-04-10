const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

module.exports = () => open({
      filename: './database.sqlite', //arquivo pra salvar os dados
      driver: sqlite3.Database, // processa os dados e salva no arquivo
   })