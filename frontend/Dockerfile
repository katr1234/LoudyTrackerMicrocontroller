FROM node:24.14.0-alpine

WORKDIR /loudy-tracker-app
 
COPY /loudy-tracker-app/package*.json ./
RUN npm install
 
COPY loudy-tracker-app/. .
 
EXPOSE 3000
CMD ["npm", "start"]