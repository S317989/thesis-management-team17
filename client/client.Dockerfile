FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

CMD ["npm", "run", "dev"]