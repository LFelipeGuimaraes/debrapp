const { Model, DataTypes } = require('sequelize');

const UserSchools = require('./UserSchools');

class School extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            code: DataTypes.STRING,
        }, { sequelize })
    }

    static associate(models) {
        this.hasMany(models.Class, { foreignKey: 'school_id', as: 'classes' });
        this.hasMany(models.Student, { foreignKey: 'school_id', as: 'students' });
        this.belongsToMany(models.User, { foreignKey: 'school_id', through: UserSchools, as: 'users' });
    }
}

module.exports = School;