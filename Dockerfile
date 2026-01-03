FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./common-svc-lib ./common-svc-lib
RUN cd common-svc-lib && npm install

WORKDIR /usr/src/app/services/email-wrk
COPY ./services/email-wrk/package*.json ./
RUN npm install

COPY ./services/email-wrk/ .

CMD ["npm", "run", "start:worker"]