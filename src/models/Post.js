const { Model, DataTypes } = require('sequelize');
const categories = require('../config/categories');

class Post extends Model {
    static init(sequelize) {
        super.init({
            content: DataTypes.STRING,
            category: DataTypes.STRING,
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    }
}

module.exports = Post;