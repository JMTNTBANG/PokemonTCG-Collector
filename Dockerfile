FROM node:24-alpine3.21

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npx", "tsx", "server/main.ts"]
