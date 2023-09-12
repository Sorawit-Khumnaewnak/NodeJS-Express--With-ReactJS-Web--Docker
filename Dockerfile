FROM node:18.16.0

ARG PORT_INTERNAL

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install pm2@5.3.0 -g && pm2 update
COPY ./init.sh /
RUN chmod +x /init.sh

EXPOSE $PORT_INTERNAL


CMD ["sh", "/init.sh"]
