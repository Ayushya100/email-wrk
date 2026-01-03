'use strict';

import Mailgen from 'mailgen';
import path from 'path';
import { readFile } from 'fs/promises';
import { logger } from 'common-svc-lib';
import transport from './connection.email.js';

const log = logger('Send-Mail');

class Mail {
  constructor(template, type, options) {
    this.template = template;
    this.type = type;
    this.options = options;

    log.info('Mail Processing Initiated');
  }

  async loadRequestedTemplate() {
    log.info('Mail Template retrieval initiated');
    const serviceRoot = process.cwd();
    const templatePath = path.join(serviceRoot, './src/assets/mailTemplate.json');
    const applicationPath = path.join(serviceRoot, './src/assets/application.json');

    let template = await readFile(templatePath, 'utf-8');
    template = JSON.parse(template);

    let applicationInfo = await readFile(applicationPath, 'utf-8');
    applicationInfo = JSON.parse(applicationInfo);

    const templateDtl = template[this.template];

    if (!templateDtl) {
      log.error('Template Details not found');
      throw new Error('Template Details not found');
    }

    this.emailOptions = {
      ...this.options,
      ...templateDtl,
      ...applicationInfo,
    };

    log.info('Mail Template retrieved successfully');
    return true;
  }

  formatEmail() {
    log.info('Email Body transformation initiated');
    const HOST = process.env.HOST;
    const PORT = process.env.PORT;
    const PROTOCOL = process.env.PROTOCOL;

    const body = {};
    body['name'] = this.emailOptions.name;
    body['intro'] = this.emailOptions.INTRO;

    if (this.type === 'TABLE') {
      body['table'] = {
        data: this.emailOptions.TABLE_DATA,
        columns: {
          customWidth: {
            name: '35%',
            description: '65%',
          },
          customAlignment: {
            name: 'left',
            description: 'left',
          },
        },
      };
    }

    if (this.emailOptions.link) {
      body['action'] = {
        instructions: this.emailOptions.INSTRUCTIONS,
        button: {
          color: this.emailOptions.BTN_COLOR || '#22BC66',
          text: this.emailOptions.BTN_TEXT,
          link: `${PROTOCOL}://${HOST}:${PORT}/${this.emailOptions.link}`,
        },
      };
    }

    body['outro'] = this.emailOptions.outro;

    this.body = {
      body: body,
    };

    log.info('Email Body transformation completed');
  }

  async sendMail() {
    log.info('Send mail operation initiated');
    const mailGenerator = new Mailgen({
      theme: this.emailOptions.THEME || 'default',
      product: {
        name: this.emailOptions.PRODUCT_NAME,
        link: this.emailOptions.PRODUCT_LINK,
      },
    });

    let emailText = mailGenerator.generatePlaintext(this.body);
    let emailHTML = mailGenerator.generate(this.body);

    const mailContent = {
      from: this.emailOptions.FROM,
      to: this.emailOptions.email_id,
      subject: this.emailOptions.SUBJECT,
      text: emailText,
      html: emailHTML,
    };

    try {
      log.info('Sending mail to the user...');
      const emailResponse = await transport.sendMail(mailContent);
      log.success(`Email Response: ${emailResponse.envelope}`);

      log.success('Email has been sent to user successfully on the provided email id.');
      return true;
    } catch (err) {
      log.error(`Failed to send email to the user: ${err}`);
      throw new Error('Failed to send email to the user');
    }
  }
}

export default Mail;
