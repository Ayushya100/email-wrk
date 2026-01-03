'use strict';

import { logger } from 'common-svc-lib';
import Mail from './builder.email.js';

const log = logger('util: send-email');

const sendMail = async (template, type = 'PLAIN', options) => {
  const mail = new Mail(template, type, options);
  await mail.loadRequestedTemplate();
  mail.formatEmail();

  await mail.sendMail();
  log.success('Send mail operation completed');
  return true;
};

export default sendMail;
