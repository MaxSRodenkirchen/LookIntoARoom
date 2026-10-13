FROM node:22-alpine AS build
WORKDIR /app
ADD https://github.com/MaxSRodenkirchen/LookIntoARoom.git /app
RUN npm ci && npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80