FROM node:19-alpine

WORKDIR /frontend

COPY ./package*.json .

RUN npm install

COPY . ./

CMD ["npm", "start"]

EXPOSE 8001
