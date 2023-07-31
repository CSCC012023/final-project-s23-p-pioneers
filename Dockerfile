# BACKEND
FROM node:14 AS base1
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm install
COPY backend/ ./

FROM node:14-alpine AS backend
WORKDIR /app/backend
COPY --from=base1 ./ ./
CMD ["npm", "start"]

# FRONTEND
FROM node:14 AS base2
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install --force
COPY frontend/ ./
RUN npm run build

FROM node:14-alpine AS frontend
WORKDIR /app
COPY --from=base2 ./dist ./dist
COPY --from=base2 ./node_modules ./node_modules
CMD ["node", "dist/index.js"]

FROM nginx:latest
COPY --from=backend ./app/backend /app/backend
COPY --from=frontend ./app/dist /app/frontend

EXPOSE 3000

CMD service nginx start && \
    cd /app/backend && npm start && \
    cd /app/frontend && node dist/index.js