FROM node:16.3.0-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

COPY tsconfig.json ./

RUN npm install
	
COPY . .

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait

RUN chmod +x /wait

EXPOSE 3030

CMD ["npm", "run", "dev"]