'use strict';

import validatePayload from './validatePayload.controller.js';
import {
  sendVerificationMail,
  sendVerificationConfirmationMail,
  sendPasswordResetRequestMail,
  sendPasswordResetConfirmationmail,
} from './sendMail.controller.js';

export { validatePayload, sendVerificationMail, sendVerificationConfirmationMail, sendPasswordResetRequestMail, sendPasswordResetConfirmationmail };
