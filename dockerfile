FROM node:12.3.1-alpine
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY . .

ENTRYPOINT ["npm","run","start"]
