const {Pool} = require('pg');

const pool= new Pool({
    user:"postgres",
    password:"kiselikupus",
    database:"Sport-Team-Rankings",
    host:"localhost",
    port:5432,
    ssl:true
});

module.exports={
    query:(text, params)=> pool.query(text, params),
};