FROM node:18-alpine

WORKDIR /usr/src/frontend_cms

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD [ "npm","start" ]

