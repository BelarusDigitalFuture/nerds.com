FROM node:14.15

RUN cd /etc && \
rm localtime && \
ln -s /usr/share/zoneinfo/US/Pacific localtime

WORKDIR /app

COPY ["./package.json", "./yarn.lock", "/app/"]
COPY ["./src", "/app/src"]
COPY ["./public", "/app/public"]

ARG NODE_ENV="production"

ENV NODE_ENV=${NODE_ENV}
RUN yarn install
RUN yarn build
