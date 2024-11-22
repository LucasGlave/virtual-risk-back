import { Op } from "sequelize"
import Poliza from "../models/poliza"

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

const viewPolizas = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const { count, rows } = await Poliza.findAndCountAll({
      order: [['id', 'ASC']],
      offset: offset,
      limit: limit
  });

  return {
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: rows
  };
};

const viewPolizaByNumber = async (numeroPoliza:string) => {
    return await Poliza.findOne({ where: {numeroPoliza}});
}

const editPolizaByNumber = async (numeroPoliza:string, data: PolizaProps) => {
    const poliza = await Poliza.findOne({ where: {numeroPoliza}});
    if(!poliza) throw new Error('Poliza not found')
    return poliza.update({...data})
}

const deletePolizaByNumber = async (numeroPoliza:string) => {
    const poliza = await Poliza.findOne({ where: {numeroPoliza}});
    if(!poliza) throw new Error('Poliza not found')
    await poliza.destroy()
    return poliza
}

const filterPolizas = async (filters: Partial<PolizaProps>, page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const whereClause: any = {};

  if (filters.asegurado) {
    whereClause.asegurado = { [Op.iLike]: `%${filters.asegurado}%` };
  }
  if (filters.compañia) {
    whereClause.compañia = { [Op.iLike]: `%${filters.compañia}%` };
  }
  if (filters.riesgo) {
    whereClause.riesgo = { [Op.iLike]: `%${filters.riesgo}%` };
  }
  if (filters.detalle) {
    whereClause.detalle = { [Op.iLike]: `%${filters.detalle}%` };
  }
  if (filters.estado) {
    whereClause.estado = { [Op.iLike]: `%${filters.estado}%` };
  }
  if (filters.vigenciaInicio && filters.vigenciaFin) {
    whereClause.vigenciaInicio = { [Op.gte]: filters.vigenciaInicio };
    whereClause.vigenciaFin = { [Op.lte]: filters.vigenciaFin };
  } else if (filters.vigenciaInicio) {
    whereClause.vigenciaInicio = { [Op.gte]: filters.vigenciaInicio };
  } else if (filters.vigenciaFin) {
    whereClause.vigenciaFin = { [Op.lte]: filters.vigenciaFin };
  }

  const { count, rows } = await Poliza.findAndCountAll({
    where: whereClause,
    order: [['id', 'ASC']],
    offset,
    limit,
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
    pageSize,
    data: rows,
  };
};


export default {createPoliza, viewPolizas, viewPolizaByNumber, editPolizaByNumber, deletePolizaByNumber, filterPolizas}