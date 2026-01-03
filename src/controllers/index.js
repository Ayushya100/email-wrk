'use strict';

import validatePayload from './validatePayload.controller.js';
import { sendVerificationMail, sendVerificationConfirmationMail } from './sendMail.controller.js';

export { validatePayload, sendVerificationMail, sendVerificationConfirmationMail };
