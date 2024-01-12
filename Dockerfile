FROM node:18.17.1

COPY . .

COPY package*.json ./ 

RUN npm install -g nodemon

WORKDIR /usr/scr/app

EXPOSE 3000

CMD [ "npm", "start" ]