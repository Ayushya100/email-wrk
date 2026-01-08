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
    link: `${accountSvcConfig.serviceName}/api/v1.0/auth/verify/email/${convertIdToPrettyString(payload.data.id)}/${payload.data.verification_code}`,
  };

  await sendMail(payload.template, 'PLAIN', options);

  log.success('Verification mail send operation completed');
};

const sendVerificationConfirmationMail = async (payload) => {
  log.info('Verification Confirmation mail send to user process initiated');
  const fullName = getFullName(payload.data);
  const tabularData = [
    { name: 'First Name', description: payload.data.first_name },
    { name: 'Last Name', description: payload.data.last_name },
    { name: 'Username', description: payload.data.username },
    { name: 'Email Id', description: payload.data.email_id },
  ];

  const options = {
    name: fullName,
    email_id: payload.to,
    TABLE_DATA: tabularData,
  };

  await sendMail(payload.template, 'TABLE', options);

  log.success('Verification Confirmation mail send operation completed');
};

const sendPasswordResetRequestMail = async (payload) => {
  log.info('Password Reset Request mail send operation initiated');
  const fullName = getFullName(payload.data);

  const options = {
    name: fullName,
    email_id: payload.to,
    link: `${accountSvcConfig.serviceName}/api/v1.0/auth/password/reset/${convertIdToPrettyString(payload.data.id)}/${payload.data.verification_code}`,
  };

  await sendMail(payload.template, 'PLAIN', options);

  log.success('Password Reset Request mail send operation completed');
};

const sendPasswordResetConfirmationmail = async (payload) => {
  log.info('Password Reset confirmation mail send operation initiated');
  const fullName = getFullName(payload.data);

  const options = {
    name: fullName,
    email_id: payload.to,
  };

  await sendMail(payload.template, 'PLAIN', options);

  log.success('Password Reset confirmation mail has been sent successfully');
};

export { sendVerificationMail, sendVerificationConfirmationMail, sendPasswordResetRequestMail, sendPasswordResetConfirmationmail };
