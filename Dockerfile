FROM node:12.18.3

WORKDIR /app

COPY package.json .
COPY pm2.json .
COPY .next .next/

RUN npm install --production --force

EXPOSE 80

CMD ["npm", "run", "pm2"]

# npm run build first

# docker build -t asia.gcr.io/shoppingcat/dev-seller:0.0.4 .
# docker push asia.gcr.io/shoppingcat/dev-seller:0.0.4

# docker run --name shopping-cat-seller-con -p 80:80 asia.gcr.io/shoppingcat/dev-seller:0.0.4