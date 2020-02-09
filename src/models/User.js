const { Model, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
require('custom-env').env(process.env.NODE_ENV);

const UserSchools = require('./UserSchools');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, { sequelize })
    }

    static associate(models) {
        this.belongsToMany(models.School, { foreignKey: 'user_id', through: UserSchools, as: 'schools' });
    }

    generateAuthToken() {
        return jwt.sign({ id: this.id }, process.env.JWT_KEY, { expiresIn: '1d' });
    }

}

module.exports = User;