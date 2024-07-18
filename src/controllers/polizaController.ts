import { Request, Response } from 'express';
import polizaService from '../services/polizaService';
// import { body, param, validationResult } from 'express-validator';

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

const createPoliza = async (req: Request, res: Response) => {
    try {
        const response = await polizaService.createPoliza(req.body);
        if(!response) {
            return res.status(400).send("Poliza not found")
        } else {
            return res.status(200).send(response)
        }
    }
    catch (error: any) {
        return res.status(400).send({ error });
    }
};

const viewPolizas = async (req: Request, res: Response) => {
    try {
        const response = await polizaService.viewPolizas();
        if(!response) {
            return res.status(400).send("Polizas not found")
        } else {
            return res.status(200).send(response)
        }
    }
    catch (error: any) {
        return res.status(400).send({ error });
    }
};

const viewPolizaById = async (req: Request, res: Response) => {
    try {
        const response = await polizaService.viewPolizaById(+req.params.id);
        if(!response) {
            return res.status(400).send("Poliza not found")
        } else {
            return res.status(200).send(response)
        }
    }
    catch (error: any) {
        return res.status(400).send({ error });
    }
};

const editPolizaById = async (req: Request, res: Response) => {
    try {
        const response = await polizaService.editPolizaById(+req.params.id, req.body);
        if(!response) {
            return res.status(400).send("Poliza not found")
        } else {
            return res.status(200).send(response)
        }
    }
    catch (error: any) {
        return res.status(400).send({ error });
    }
};

const deletePolizaById = async (req: Request, res: Response) => {
    try {
        const response = await polizaService.deletePolizaById(+req.params.id);
        if(!response) {
            return res.status(400).send("Poliza not found")
        } else {
            return res.status(200).send(response)
        }
    }
    catch (error: any) {
        return res.status(400).send({ error });
    }
};

const filterPolizas = async (req: Request, res: Response) => {
    try {
      const filters: Partial<PolizaProps> = {};
      if (req.query.asegurado) filters.asegurado = req.query.asegurado as string;
      if (req.query.compañia) filters.compañia = req.query.compañia as string;
      if (req.query.detalle) filters.detalle = req.query.detalle as string;
      if (req.query.vigenciaInicio) filters.vigenciaInicio = new Date(req.query.vigenciaInicio as string);
      if (req.query.vigenciaFin) filters.vigenciaFin = new Date(req.query.vigenciaFin as string);
      const polizas = await polizaService.filterPolizas(filters);
      res.status(200).send(polizas);
    } catch (error) {
      res.status(500).send('Error fetching polizas');
    }
  };

export default {createPoliza, viewPolizas, viewPolizaById, editPolizaById, deletePolizaById, filterPolizas}