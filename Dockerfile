FROM node:24-alpine AS base

ENV DIR=/app
WORKDIR $DIR

FROM base AS dev

ENV NODE_ENV=development

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm i --frozen-lockfile

RUN cat > /app/run-app.sh <<'EOF' 
#!/bin/sh
set -e

echo "🏁 waiting for the database to finish initializing..."
sleep 1

echo "🏁 Create folder log"
mkdir -p logs

echo "🏁 Delete generated databases"
if [ -d "generated" ]; then
  rm -rf generated/*
fi

echo "🏁 Created generated database..."
npx prisma generate

echo "🏁 Starting migrations..."
npx prisma migrate deploy

echo "🚀 Starting application..."
exec pnpm run start:dev

EOF

RUN sed -i 's/\r$//' /app/run-app.sh
RUN chmod +x /app/run-app.sh

EXPOSE $PORT

CMD [ "/bin/sh", "/app/run-app.sh" ]