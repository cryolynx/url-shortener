#!/usr/bin/env sh

cd ui
cp .env.example .env
npm install
cd ..

cd server
cp .env.example .env
npm install
docker-compose up -d
