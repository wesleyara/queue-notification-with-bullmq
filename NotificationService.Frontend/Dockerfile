FROM node:22-slim

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
COPY .yarn ./.yarn

RUN yarn install --immutable

COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--host"]
