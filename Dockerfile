FROM node:latest

ENV PORT=${PORT}
ENV REDIS_URL=${REDIS_URL}

WORKDIR /application/
COPY . .
RUN npm && npm run build
ENTRYPOINT [ "npm", "start"]
EXPOSE ${PORT}