FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache --update tzdata

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_URL=https://gnaumann.de
ENV TZ=Europe/Berlin

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY ./public ./public
COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
