import { DataTypes, Model } from 'sequelize';
import db from './database';

class Poliza extends Model {}

Poliza.init(
  {
    asegurado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compañia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    riesgo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numeroPoliza: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detalle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vigenciaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    vigenciaFin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    moneda: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    premio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    formaDePago: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'polizas',
    timestamps: false,
  }
);

export default Poliza;
