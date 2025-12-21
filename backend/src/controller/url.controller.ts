import UrlMongoRepository from '../repository/url.mongo.js';
import z from 'zod';
import urlSchema, { url } from '../model/url.js';
import { Request, Response } from 'express';
import { mongo } from 'mongoose';
import { ur } from 'zod/v4/locales';

export default class UrlController {
  private mongoRepository: UrlMongoRepository;

  constructor() {
    this.mongoRepository = new UrlMongoRepository();
  }

  getAllURLs = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: url[] = await this.mongoRepository.getAllURLs();
      res.status(200).json(data);
    } catch (e) {
      res
        .status(500)
        .json({ message: e instanceof Error ? e.message : String(e) });
    }
  };

  createURL = async (req: Request, res: Response): Promise<void> => {
    const { url, shortCode } = req.body;

    try {
      const urlParsed = urlSchema.safeParse({ url, shortCode });

      if (!urlParsed.success) {
        res.status(420).json({ message: urlParsed.error });
        return;
      }

      const shortCodeExist = await this.mongoRepository.shortCodeExist({
        shortCode,
      });

      if (shortCodeExist) {
        res.status(422).json({ message: 'shortCode already taken.' });
        return;
      }

      const createdUrl = await this.mongoRepository.createURL({
        ...urlParsed.data,
        timesVisited: 0,
      });

      res.status(204).json(createdUrl);
    } catch (e) {
      res
        .status(500)
        .json({ message: e instanceof Error ? e.message : String(e) });
    }
  };
}
