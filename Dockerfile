FROM node:alpine
WORKDIR /node-express
RUN npm i
COPY ./ ./
CMD ['npm', 'start']