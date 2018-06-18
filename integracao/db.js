
const pg = require('pg');

const config = {
    host: '127.0.0.1',
    user: 'postgres',     
    password: 'c3df32ea',
    database: 'UVA',
    port: 5432,
    ssl: false
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
    else {
        //queryDatabase();
    }
});

var queryDatabase = function(tabela, id, nome) {
    var query = "INSERT INTO knox_" + tabela + "(id, nome) values(" + id + ",'" + nome + "') ON CONFLICT (id) DO NOTHING;";
   

    client
        .query(query)
        .then(() => {
            //console.log("Registro inserido!");
        })
        .catch(err => console.log(err))
        .then(() => {
            //console.log('Finished execution, exiting now');
            //process.exit();
        });
}

module.exports = queryDatabase;