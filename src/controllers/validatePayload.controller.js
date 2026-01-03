'use strict';

import { logger } from 'common-svc-lib';

const log = logger('controller: validate-payload');

const validatePayload = (payload) => {
  log.info('Payload from validate schema');

  if (!payload.to) {
    log.error('Email address is missing');
    throw new Error('Email address missing');
  }

  if (!payload.data) {
    log.error('Email body data is missing');
    throw new Error('Email body data missing');
  }

  log.success('Payload validation completed successfully');
  return true;
};

export default validatePayload;
