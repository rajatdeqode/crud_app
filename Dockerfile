FROM node:alpine 

WORKDIR /usr/src/node_crud

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm","start"]
