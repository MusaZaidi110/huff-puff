#Sample Dockerfile for NodeJS Apps

FROM node:22
ENV NODE_ENV=test
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 8000
CMD [ "node", "index.js" ]