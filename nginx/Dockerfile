FROM nginx:alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/certs /certs

RUN mkdir /challenges
