import { jest } from '@jest/globals';
import { TinyPNG } from '.';

const { mocked } = jest;

jest.mock('axios');

import axios from 'axios';

const createMock = mocked(axios.create);
const postMock = mocked(axios.post);
const getMock = mocked(axios.get);

beforeEach(() => {
  createMock.mockClear();
  postMock.mockClear();
  getMock.mockClear();
});

describe('TinyPNG', () => {
  describe('URL', () => {
    it('calls the right API endpoints without config', async () => {
      createMock.mockImplementation(() => axios);
      postMock.mockResolvedValueOnce({
        data: {
          input: {
            size: 207565,
            type: 'image/jpeg',
          },
        },
        headers: {
          location: 'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        },
      });
      getMock.mockResolvedValueOnce({
        data: 'buffer',
      });

      const client = new TinyPNG('abc123');
      const result = await client.compress('http://example.com/example.jpg');
      expect(result).toMatchSnapshot();
      expect(postMock).toHaveBeenCalledWith(
        '/shrink',
        {
          source: {
            url: 'http://example.com/example.jpg',
          },
        },
        { headers: { 'Content-Type': 'application/json' } },
      );
    });

    it('calls the right API endpoints with basic config', async () => {
      createMock.mockImplementation(() => axios);
      postMock.mockResolvedValueOnce({
        data: {
          input: {
            size: 207565,
            type: 'image/jpeg',
          },
        },
        headers: {
          location: 'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        },
      });
      postMock.mockResolvedValueOnce({
        data: 'buffer',
      });

      const client = new TinyPNG('abc123');
      const result = await client.compress('http://example.com/example.jpg', {
        preserve: ['copyright'],
      });
      expect(result).toMatchSnapshot();
      expect(postMock).toHaveBeenNthCalledWith(
        1,
        '/shrink',
        {
          source: {
            url: 'http://example.com/example.jpg',
          },
        },
        { headers: { 'Content-Type': 'application/json' } },
      );
      expect(postMock).toHaveBeenNthCalledWith(
        2,
        'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        {
          data: {
            preserve: ['copyright'],
          },
        },
      );
    });

    it('calls the right API endpoints with resizing config', async () => {
      createMock.mockImplementation(() => axios);
      postMock.mockResolvedValueOnce({
        data: {
          input: {
            size: 207565,
            type: 'image/jpeg',
          },
        },
        headers: {
          location: 'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        },
      });
      postMock.mockResolvedValueOnce({
        data: 'buffer',
      });

      const client = new TinyPNG('abc123');
      const result = await client.compress('http://example.com/example.jpg', {
        width: 123,
        height: 456,
        method: 'fit',
        preserve: ['copyright'],
      });
      expect(result).toMatchSnapshot();
      expect(postMock).toHaveBeenNthCalledWith(
        1,
        '/shrink',
        {
          source: {
            url: 'http://example.com/example.jpg',
          },
        },
        { headers: { 'Content-Type': 'application/json' } },
      );
      expect(postMock).toHaveBeenNthCalledWith(
        2,
        'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        {
          data: {
            resize: {
              method: 'fit',
              width: 123,
              height: 456,
            },
            preserve: ['copyright'],
          },
        },
      );
    });
  });

  describe('Buffer', () => {
    it('calls the right API endpoints without config', async () => {
      createMock.mockImplementation(() => axios);
      postMock.mockResolvedValueOnce({
        data: {
          input: {
            size: 207565,
            type: 'image/jpeg',
          },
        },
        headers: {
          location: 'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        },
      });
      getMock.mockResolvedValueOnce({
        data: 'buffer',
      });

      const client = new TinyPNG('abc123');
      const result = await client.compress(Buffer.from('image'));
      expect(result).toMatchSnapshot();
      expect(postMock).toHaveBeenCalledWith('/shrink', Buffer.from('image'), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    });

    it('calls the right API endpoints with basic config', async () => {
      createMock.mockImplementation(() => axios);
      postMock.mockResolvedValueOnce({
        data: {
          input: {
            size: 207565,
            type: 'image/jpeg',
          },
        },
        headers: {
          location: 'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        },
      });
      postMock.mockResolvedValueOnce({
        data: 'buffer',
      });

      const client = new TinyPNG('abc123');
      const result = await client.compress(Buffer.from('image'), {
        preserve: ['copyright'],
      });
      expect(result).toMatchSnapshot();
      expect(postMock).toHaveBeenNthCalledWith(
        1,
        '/shrink',
        Buffer.from('image'),
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      expect(postMock).toHaveBeenNthCalledWith(
        2,
        'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        {
          data: {
            preserve: ['copyright'],
          },
        },
      );
    });

    it('calls the right API endpoints with resizing config', async () => {
      createMock.mockImplementation(() => axios);
      postMock.mockResolvedValueOnce({
        data: {
          input: {
            size: 207565,
            type: 'image/jpeg',
          },
        },
        headers: {
          location: 'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        },
      });
      postMock.mockResolvedValueOnce({
        data: 'buffer',
      });

      const client = new TinyPNG('abc123');
      const result = await client.compress(Buffer.from('image'), {
        width: 123,
        height: 456,
        method: 'fit',
        preserve: ['copyright'],
      });
      expect(result).toMatchSnapshot();
      expect(postMock).toHaveBeenNthCalledWith(
        1,
        '/shrink',
        Buffer.from('image'),
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      expect(postMock).toHaveBeenNthCalledWith(
        2,
        'https://api.tinify.com/output/2xnsp7jn34e5.jpg',
        {
          data: {
            resize: {
              method: 'fit',
              width: 123,
              height: 456,
            },
            preserve: ['copyright'],
          },
        },
      );
    });
  });
});
