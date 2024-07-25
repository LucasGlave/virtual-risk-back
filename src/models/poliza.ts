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
        unique: true
    },
    detalle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "VIGENTE"
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
    hooks: {
      beforeSave: (poliza, options) => {
        actualizarEstado(poliza)
      },
      beforeUpdate: (poliza, options) => {
        actualizarEstado(poliza);
      },
      afterFind: (polizas, options) => {
        if (Array.isArray(polizas)) {
          polizas.forEach(poliza => actualizarEstado(poliza));
        } else if (polizas) {
          actualizarEstado(polizas);
        }
      }
    }
  }
);

function actualizarEstado(poliza: any) {
  const hoy = new Date();
  if (poliza.estado !== 'ANULADA') {
    if (poliza.vigenciaFin < hoy) {
      poliza.estado = 'VENCIDA';
    } else {
      poliza.estado = 'VIGENTE';
    }
  }
}

export default Poliza;
