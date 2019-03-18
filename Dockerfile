FROM node:latest

ENV PORT=${PORT}
ENV REDIS_URL=${REDIS_URL}
ENV REDIS_PORT=${REDIS_PORT}

WORKDIR /application/
COPY . .
RUN yarn && yarn run build
ENTRYPOINT [ "yarn", "start"]
EXPOSE ${PORT}