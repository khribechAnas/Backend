FROM node:20

WORKDIR /ecom/backend

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]