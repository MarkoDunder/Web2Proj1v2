const {Pool} = require('pg');

const pool= new Pool({
    user:"project1_db_user",
    password:"WMzR1wnfLLT8lBo19KHXw6FfuqpYgWZu",
    database:"project1_db",
    host:"dpg-cdf9dv9gp3juhhupsso0-a.frankfurt-postgres.render.com",
    port:5432,
    ssl:true
});

module.exports={
    query:(text, params)=> pool.query(text, params),
};