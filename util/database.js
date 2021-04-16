const Sequelize = require('sequelize');

const sequelize = new Sequelize('short-link', 'root', '',{
    dialect: 'mysql',
    host: 'localhost'
});
if(sequelize){
    console.log('database connected successfully')
}else{
    console.log(err)
}
module.exports = sequelize;