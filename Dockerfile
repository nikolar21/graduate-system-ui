FROM node:alpine
ARG REACT_APP_ENV
ENV REACT_APP_ENV=$REACT_APP_ENV
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]
