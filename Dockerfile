FROM node:12-stretch-slim

RUN runDeps="openssl ca-certificates patch" \
    && apt-get update \
    && apt-get install -y --no-install-recommends $runDeps git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . /opt/frontend/
RUN chown -R node /opt/frontend/

WORKDIR /opt/frontend/
USER node

ENV VOLTO_API_PATH "http://10.1.0.11:62934/Plone"
ENV VOLTO_INTERNAL_API_PATH "http://10.1.0.11:62934/Plone"

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
    && yarn develop \
    && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
    && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build \
    && rm -rf /home/node/.cache


EXPOSE 3000 3001 4000 4001

CMD ["yarn", "start"]
