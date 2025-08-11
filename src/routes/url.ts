import { Router } from 'express';
import { DataSource } from 'typeorm';
import { RedisClientType } from 'redis';

// Controllers.
import { urlController } from '../controllers/url';

export const urlRoutes = (
  dataSource: DataSource,
  cache: RedisClientType
): Router => {
  const router = Router();

  const controller = urlController(dataSource, cache);

  /**
   * @swagger
   * /{encodedId}:
   *  get:
   *    summary: Get url related to short url
   *    description: Retrieves and redirects to the stored url
   *    tags:
   *      - Url
   *    parameters:
   *      - name: encodedId
   *        in: path
   *        required: true
   *        description: Shorten url encoded identifier
   *        schema:
   *          type: string
   *          example: 1
   *    responses:
   *      302:
   *        description: Redirection to url
   *      404:
   *        description: Not found
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UrlNotFoundResponse'
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/InternalServerErrorResponse'
   */
  router.get('/:encodedId', controller.redirectToUrl);

  /**
   * @swagger
   * /shorten:
   *  post:
   *    summary: Shorten url
   *    description: Stores on database the given url and return the short url
   *    tags:
   *      - Url
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              url:
   *                type: string
   *                description: Url to be shorten
   *                example: https://github.com/cristiancosta/node-ts-jwt
   *            required:
   *              - url
   *    responses:
   *      200:
   *        description: Shorten url
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ShortenUrlResponse'
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/InternalServerErrorResponse'
   */
  router.post('/shorten', controller.shortenUrl);

  return router;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     ShortenUrlResponse:
 *       type: object
 *       properties:
 *         shortUrl:
 *           type: string
 *           description: Shorten url
 *           example: localhost:8888/1
 *     UrlNotFoundResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *           example: URL_NOT_FOUND
 *     InternalServerErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *           example: INTERNAL_SERVER_ERROR
 */
