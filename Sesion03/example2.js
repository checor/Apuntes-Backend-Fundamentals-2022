import { Sequelize, Model, DataTypes, Op } from 'sequelize';

const sequelize = new Sequelize('sqlite:db.sqlite3', {logging: false});
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  age: DataTypes.INTEGER,
});

await User.sync({force: true})

await User.create({
    username: 'janedoe',
    age: 20,
});

const jane = await User.findOne({where: {username: 'janedoe', age: {[Op.gte]: 12}}});
console.log("Jane ha sido encontrada", jane.username, "y su edad es", jane.age);
const total = await User.findAll();
console.log("Hay un total de", total.length, "usuarios");