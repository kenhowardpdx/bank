FROM node:20-alpine3.19
WORKDIR /app

ARG BUILD_CONTEXT
ENV BUILD_CONTEXT=${BUILD_CONTEXT}

COPY yarn.lock ./
COPY package.json ./
COPY tsconfig* .
COPY apps/${BUILD_CONTEXT}/package.json ./apps/${BUILD_CONTEXT}/
COPY packages packages

RUN corepack enable
RUN yarn install

CMD ["sh", "-c", "yarn workspace @bank/${BUILD_CONTEXT} run start"]
