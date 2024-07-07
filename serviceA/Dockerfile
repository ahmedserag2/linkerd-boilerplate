FROM node:18-alpine


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --verbose


COPY . .

CMD ["node", "serviceA.js"]