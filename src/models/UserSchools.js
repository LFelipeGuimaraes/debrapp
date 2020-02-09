const { Model, DataTypes } = require('sequelize');

class UserSchools extends Model {
    static init(sequelize) {
        super.init({
            isManager: DataTypes.BOOLEAN,
        }, { sequelize })
    }
}

module.exports = UserSchools;