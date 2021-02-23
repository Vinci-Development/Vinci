const { DataTypes, Model } = require('sequelize');

module.exports = class Guilds extends Model {
    static init(sequelize) {
        return super.init({
            guildName: {
                type: DataTypes.STRING
            },
            guildId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            memberSize: {
                type: DataTypes.INTEGER
            },
            channelSize: {
                type: DataTypes.INTEGER
            },
            banSize: {
                type: DataTypes.INTEGER
            },
            roleSize: {
                type: DataTypes.INTEGER
            },
            guildOwner: {
                type: DataTypes.STRING
            },
            guildOwnerId: {
                type: DataTypes.STRING
            }
        }, {
            tableName: 'Guilds',
            sequelize
        })
    }
}