FROM node:18.19-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["sh", "-c", "npm install && npm run start"]
