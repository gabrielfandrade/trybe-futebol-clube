FROM node:16.14-alpine
WORKDIR /app-backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
ENV  DB_USER=root
ENV  DB_PASS=123456
ENV  DB_HOST=db
ENV  DB_PORT=3002
CMD ["npm", "start"]