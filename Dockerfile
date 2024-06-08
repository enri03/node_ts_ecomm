FROM node:22.2-alpine as build
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM node:22.2-alpine as production
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm install 
COPY --from=build /app/dist /app/dist
# Copy the start.sh script
COPY start.sh /app

# Make sure the script is executable
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]