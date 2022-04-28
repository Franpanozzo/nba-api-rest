FROM node:14.15.1-alpine

WORKDIR /app

COPY . .

RUN npm install --only=production

USER node

CMD ["npm", "start"]

EXPOSE 8000