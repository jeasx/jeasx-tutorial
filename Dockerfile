# This file is an example. Feel free to delete it.
FROM node:lts-alpine

USER node
WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node . ./

# Libraries like React check NODE_ENV and otherwise load their slower development builds.
ENV NODE_ENV=production
RUN node --run build

# Uses the example health route ("src/[health].json"). Keep that route or remove this check. wget ships with Alpine.
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- "http://localhost:${PORT:-3000}/health" > /dev/null || exit 1

CMD ["node","node_modules/jeasx/cli.js","start"]
