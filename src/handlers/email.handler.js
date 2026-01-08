'use strict';

import { logger } from 'common-svc-lib';
import {
  validatePayload,
  sendVerificationMail,
  sendVerificationConfirmationMail,
  sendPasswordResetRequestMail,
  sendPasswordResetConfirmationmail,
} from '../controllers/index.js';

const log = logger('Email-Handler');

const handleEmailTask = async (taskData) => {
  try {
    log.info(`Worker - Received Task: ${taskData.taskId}`);

    log.info('Call controller function to validate payload');
    validatePayload(taskData.payload);

    log.info('Send mail operation initiated');
    switch (taskData.payload.template) {
      case 'USER_VERIFICATION_MAIL':
        await sendVerificationMail(taskData.payload);
        break;
      case 'VERIFICATION_CONFIRM_MAIL':
        await sendVerificationConfirmationMail(taskData.payload);
        break;
      case 'USER_PASSWORD_RESET_REQUEST':
        await sendPasswordResetRequestMail(taskData.payload);
        break;
      case 'USER_PASSWORD_RESET_CONFIRMATION':
        await sendPasswordResetConfirmationmail(taskData.payload);
        break;
    }

    log.success('Mail send operation completed successfully');
  } catch (err) {
    log.error(`Worker Task (${taskData.taskId}) failed: ${err.message}`);
    throw err;
  }
};

export default handleEmailTask;
