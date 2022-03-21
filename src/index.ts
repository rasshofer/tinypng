import { readFile } from 'fs/promises';
import axios, { AxiosInstance } from 'axios';
import { Config, Result, ShrinkResult } from './types';

const toBuffer = async (data: string | Buffer): Promise<Buffer> =>
  typeof data === 'string' ? readFile(data) : data;

export class TinyPNG {
  private instance: AxiosInstance;

  constructor(apiKey: string) {
    this.instance = axios.create({
      baseURL: 'https://api.tinify.com',
      timeout: 10 * 1000,
      auth: {
        username: 'api',
        password: apiKey,
      },
    });
  }

  async compress(data: string | Buffer, config?: Config): Promise<Result> {
    const isUrl = typeof data === 'string' && /https?:\/\//i.test(data);
    const { data: shrinkResult, headers } =
      await this.instance.post<ShrinkResult>(
        '/shrink',
        isUrl
          ? {
              source: {
                url: data,
              },
            }
          : await toBuffer(data),
        {
          headers: {
            'Content-Type': isUrl ? 'application/json' : 'multipart/form-data',
          },
        },
      );

    if (config) {
      const { data: shrinkData } = await this.instance.post(headers.location, {
        data: {
          resize: config.method
            ? {
                method: config.method,
                width: config.width,
                height: config.height,
              }
            : undefined,
          preserve: config.preserve,
        },
      });
      return {
        data: Buffer.from(shrinkData, 'binary'),
        size: shrinkResult.input.size,
        type: shrinkResult.input.type,
      };
    }

    const { data: shrinkData } = await this.instance.get(headers.location, {
      responseType: 'arraybuffer',
    });
    return {
      data: Buffer.from(shrinkData, 'binary'),
      size: shrinkResult.input.size,
      type: shrinkResult.input.type,
    };
  }
}

export * from './types';
