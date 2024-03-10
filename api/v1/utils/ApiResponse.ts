import { Response } from 'express';

interface ErrorObject {
  title: string
  detail: string
  code?: string
  source?: {
    pointer?: string
    parameter?: string
  };
}

interface LinkObject {
  self?: string
  related?: string
  next?: string
  last?: string
}

export class ApiResponse {
  static sendSuccess(res: Response, data: any, statusCode: number = 200, links: LinkObject = {}) {
    res.status(statusCode).json({
      links: {
        self: links.self || res.req?.originalUrl,
        ...links
      },
      data: data
    });
  }

  static sendError(res: Response, errors: ErrorObject | ErrorObject[], statusCode: number = 400) {
    res.status(statusCode).json({
      errors: Array.isArray(errors) ? errors : [errors]
    });
  }

  static sendMeta(res: Response, meta: any, statusCode: number = 200, links: LinkObject = {}) {
    res.status(statusCode).json({
      links: {
        self: links.self || res.req?.originalUrl,
        ...links
      },
      meta: meta
    });
  }
}
