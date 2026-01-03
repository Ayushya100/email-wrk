'use strict';

import { Worker } from 'common-svc-lib';
import { handleEmailTask } from './handlers/index.js';

class EmailWorker extends Worker {
  constructor() {
    super('Email-Worker', 'EMAIL_TASKS');

    // Register handlers
    this.registerHandler('EMAIL', handleEmailTask);
  }
}

const worker = new EmailWorker();
worker.start();
