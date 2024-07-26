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
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = 2;

        const response = await polizaService.viewPolizas(page, pageSize);
        if (!response) {
            return res.status(400).send("Polizas not found");
        } else {
            return res.status(200).send(response);
        }
    } catch (error: any) {
        return res.status(400).send({ error });
    }
};

const viewPolizaByNumber = async (req: Request, res: Response) => {
    try {
        const response = await polizaService.viewPolizaByNumber(req.params.poliza);
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

const editPolizaByNumber = async (req: Request, res: Response) => {
    try {
        const response = await polizaService.editPolizaByNumber(req.params.poliza, req.body);
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

const deletePolizaByNumber = async (req: Request, res: Response) => {
    try {
        const response = await polizaService.deletePolizaByNumber(req.params.poliza);
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
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 2;

    try {
      const filters: Partial<PolizaProps> = {};
      if (req.query.asegurado) filters.asegurado = req.query.asegurado as string;
      if (req.query.compañia) filters.compañia = req.query.compañia as string;
      if (req.query.detalle) filters.detalle = req.query.detalle as string;
      if (req.query.estado) filters.estado = req.query.estado as string;
      if (req.query.vigenciaInicio) filters.vigenciaInicio = new Date(req.query.vigenciaInicio as string);
      if (req.query.vigenciaFin) filters.vigenciaFin = new Date(req.query.vigenciaFin as string);
      const polizas = await polizaService.filterPolizas(filters, page, pageSize);
      res.status(200).send(polizas);
    } catch (error) {
      res.status(500).send('Error fetching polizas');
    }
  };

export default {createPoliza, viewPolizas, viewPolizaByNumber, editPolizaByNumber, deletePolizaByNumber, filterPolizas}