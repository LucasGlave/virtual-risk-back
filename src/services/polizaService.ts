import { Op } from "sequelize"
import Poliza from "../models/poliza"
import { body, param, validationResult } from 'express-validator';

type PolizaProps = {
    asegurado: string,
    productor: string,
    compañia: string,
    riesgo: string,
    numeroPoliza: string,
    detalle: string,
    estado: string,
    vigenciaInicio: Date,
    vigenciaFin: Date,
    moneda: string,
    premio: number,
    formaDePago: string,
    numero?: string
}

const createPoliza = async (data: PolizaProps) => {
    return await Poliza.create({...data})
}

const viewPolizas = async () => {
    return await Poliza.findAll({order:[['id', 'ASC']]});
}

const viewPolizaById = async (id:number) => {
    return await Poliza.findByPk(+id);
}

const editPolizaById = async (id:number, data: PolizaProps) => {
    const poliza = await Poliza.findByPk(+id);
    if(!poliza) throw new Error('Poliza not found')
    return poliza.update({...data})
}

const deletePolizaById = async (id:number) => {
    const poliza = await Poliza.findByPk(+id);
    if(!poliza) throw new Error('Poliza not found')
    await poliza.destroy()
    return poliza
}

const filterPolizas = async (filters: Partial<PolizaProps>) => {
    const whereClause: any = {};
    if (filters.asegurado) {
      whereClause.asegurado = { [Op.iLike]: `%${filters.asegurado}%` };
    }
    if (filters.compañia) {
      whereClause.compañia = { [Op.iLike]: `%${filters.compañia}%` };
    }
    if (filters.detalle) {
      whereClause.detalle = { [Op.iLike]: `%${filters.detalle}%` };
    }
    if (filters.vigenciaInicio && filters.vigenciaFin) {
      whereClause.vigenciaInicio = { [Op.gte]: filters.vigenciaInicio };
      whereClause.vigenciaFin = { [Op.lte]: filters.vigenciaFin };
    } else if (filters.vigenciaInicio) {
      whereClause.vigenciaInicio = { [Op.gte]: filters.vigenciaInicio };
    } else if (filters.vigenciaFin) {
      whereClause.vigenciaFin = { [Op.lte]: filters.vigenciaFin };
    }
    return await Poliza.findAll({
      where: whereClause,
      order: [['id', 'ASC']]
    });
};

export default {createPoliza, viewPolizas, viewPolizaById, editPolizaById, deletePolizaById, filterPolizas}