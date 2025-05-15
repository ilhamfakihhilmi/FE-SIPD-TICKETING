# Tahap build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Tahap produksi
FROM node:18

# Install serve secara global
RUN npm install -g serve

# Salin hasil build dari tahap build
# COPY --from=build /app/build /app/build

COPY --from=build /app/dist /app/dist
WORKDIR /app/dist

# Port yang dibuka oleh container
EXPOSE 9007

# Jalankan aplikasi menggunakan serve
CMD ["serve", "-s", ".", "-l", "9007"]