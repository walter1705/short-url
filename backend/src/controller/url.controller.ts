import { Request, Response } from 'express';
import UrlService from '../service/url.service.js';
import { createUrlSchema } from '../model/url.js';

export default class UrlController {
  private service: UrlService;

  constructor() {
    this.service = new UrlService();
  }

  createUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = createUrlSchema.safeParse(req.body);
      if (!validation.success) {
        res
          .status(400)
          .json({
            error: 'Invalid request',
            details: validation.error.flatten(),
          });
        return;
      }
      const url = await this.service.createUrl(validation.data);
      res.status(201).json(url);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  getUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const url = await this.service.getUrl(req.params.code);
      res.status(200).json(url);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  redirect = async (req: Request, res: Response): Promise<void> => {
    try {
      const originalUrl = await this.service.resolveUrl(req.params.code);
      res.status(301).redirect(originalUrl);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  deleteUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.deleteUrl(req.params.code);
      res.status(204).send();
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  getAllUrls = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await this.service.getAllUrls(page, limit);
      res.status(200).json({
        data: result.data,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          pages: Math.ceil(result.total / result.limit),
        },
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  health = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    } catch (error) {
      res.status(503).json({ status: 'unhealthy' });
    }
  };

  private handleError(res: Response, error: any): void {
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
