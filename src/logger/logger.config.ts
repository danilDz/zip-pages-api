import { config } from 'dotenv';
config();

import * as winston from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);
const transports = [
  new LogtailTransport(logtail),
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, context, trace }) => {
        return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
      }),
    ),
  }),
];

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports,
});
