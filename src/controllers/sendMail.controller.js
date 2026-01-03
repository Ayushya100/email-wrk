'use strict';

import { logger, convertIdToPrettyString } from 'common-svc-lib';
import sendMail from '../email/send.email.js';
import { accountSvcConfig } from '../constants.js';

const log = logger('Controller: send-mail');

const getFullName = (userInfo) => {
  let fullName = userInfo.first_name;

  if (userInfo.last_name) {
    fullName += ` ${userInfo.last_name}`;
  }
  return fullName;
};

const sendVerificationMail = async (payload) => {
  log.info('Verification email send to user process initiated');
  const fullName = getFullName(payload.data);
  const options = {
    name: fullName,
    email_id: payload.to,
    link: `${accountSvcConfig.serviceName}/api/v1.0/auth/verify-email/${convertIdToPrettyString(payload.data.id)}/${payload.data.verification_code}`,
  };

  await sendMail(payload.template, 'PLAIN', options);

  log.success('Verification mail send operation completed');
};

export { sendVerificationMail };
