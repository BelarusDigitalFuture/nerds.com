FROM node:14.15

RUN cd /etc && \
rm localtime && \
ln -s /usr/share/zoneinfo/US/Pacific localtime

WORKDIR /app

COPY ["./package.json", "./yarn.lock", "/app/"]
RUN yarn install

COPY ["./src", "/app/src"]

ENV NODE_ENV="production"

EXPOSE 3000
