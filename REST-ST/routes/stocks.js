const express = require("express");
const stocksController = require('../controllers/stocks');
const auth = require('../middleware/auth'); 
const router = express.Router();

/**
 * @swagger
 * /stocks:
 *   post:
 *    summary: Post stock data
 *    description: Post the latest stocks  as list of Json
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               stock:
 *                 type: string
 *                 description: Stock name
 *                 example: SBI
 *               open:
 *                 type: integer
 *                 description: Stock open value
 *                 example: 238
 *               high:
 *                 type: integer
 *                 description: Stock open value
 *                 example: 240
 *               low:
 *                 type: integer
 *                 description: Stock open value
 *                 example: 230
 *               close:
 *                 type: integer
 *                 description: Stock open value
 *                 example: 239
 *               date:
 *                 type: date
 *                 description: Current date as default
 *                 example: 2021-03-05
 *    responses:
 *      201:
 *        discription: Returns success when the post request becomes successful
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Message
 *                 example: Success
 *   
 */
router.post('/', auth, stocksController.postStocks);

/**
 * @swagger
 * /stocks/list:
 *   get:
 *     summary: Retrieve list of available stock tickers
 *     description: Returns the list of stock ticker that can be used for retrieve the stock data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         discription: A list of stock ticket
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array 
 *                   items:
 *                     type: string
 *                     description: Stock name
 *                     example: SBIN 
 *
*/
router.get('/list', auth, stocksController.getStocksList);

/**
 * @swagger
 * /stocks/{stockname}:
 *   get:
 *     summary: Retrieve stock data for the specified stock name
 *     description: Returns the timeseries stock data for the specified stock name from the list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stockname
 *         required: true
 *         description: Stock ticker from the list
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         discription: A list of stockn data JSON
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object 
 *                     properties:
 *                       stock:
 *                         type: string
 *                         description: Stock name
 *                         example: SBI
 *                       open:
 *                         type: integer
 *                         description: Stock open value
 *                         example: 238
 *                       high:
 *                         type: integer
 *                         description: Stock open value
 *                         example: 240
 *                       low:
 *                         type: integer
 *                         description: Stock open value
 *                         example: 230
 *                       close:
 *                         type: integer
 *                         description: Stock open value
 *                         example: 239
 *                       date:
 *                         type: date
 *                         description: Current date as default
 *                         example: 2021-03-05
 *
*/
router.get('/:stock', auth, stocksController.getStockData);

module.exports = router
