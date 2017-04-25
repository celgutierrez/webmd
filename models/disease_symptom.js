'use strict';
module.exports = function(sequelize, DataTypes) {
    var disease_symptom = sequelize.define('disease_symptom', {
        diseaseId: DataTypes.INTEGER,
        symptomId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.symptom.belongsToMany(models.disease, { through: models.disease_symptom });
            }
        }
    });
    return disease_symptom;
};
