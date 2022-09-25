import { Sequelize, DataTypes, Op } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/postgres');

const User = sequelize.define("User", {
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    fecha: DataTypes.DATE
});

const Product = sequelize.define("Product", {
    nombre: DataTypes.STRING,
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    descripcion: DataTypes.TEXT
});

const Venta = sequelize.define("Venta", {
    fecha: DataTypes.DATE
});

User.hasMany(Venta, {foreignKey: {allowNull: false}});
Venta.belongsTo(User);

Product.hasMany(Venta,  {foreignKey: {allowNull: false}});
Venta.belongsTo(Product);

await sequelize.sync({force: true});

const user = await User.create({
    nombre: "Sergio",
    correo: "checor@gmail.com",
    edad: 30
})

const producto = await Product.create({
    nombre:"TV 60 pulgadas",
    precio: 50000,
    descripcion: "electronico"
})

const venta = await Venta.create({
    fecha: Date.now(),
    ProductId: producto.id,
    UserId: user.id
});

// console.log(venta.)

const resultado = await Product.findAll();
console.log("Total de productos", resultado.length);

const productos = await Product.findAll({ 
    limit: 1,
    offset: 1,
    order: [['id', 'DESC']],
    where: {
        precio: { [Op.gte]: 500}
    }
});



productos.forEach(producto => console.log (producto.nombre, producto.id));

Product.update({
    nombre: "Motoneta"
}, 
{
    where: {
        id: 7
    }
});

const borrado = await Product.destroy(
    {
        where: {
            id: 6
        }
    }
);

console.log("Productos eliminados", borrado);