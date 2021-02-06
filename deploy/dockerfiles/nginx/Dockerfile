FROM nginx:1.16.0

# Remove sym links from nginx image
RUN rm /var/log/nginx/access.log
RUN rm /var/log/nginx/error.log

RUN apt-get update && apt-get -y install logrotate

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.app.conf /etc/nginx/sites-enabled/nerds.conf
COPY logrotate.conf /etc/logrotate.d/nginx

# Start nginx and cron as a service
CMD service cron start && nginx -g 'daemon off;'
