# First stage, build the frontend
FROM node:12.18.3

RUN npm config set registry https://registry.npm.taobao.org

ENV FRONTEND=/opt/templates

WORKDIR $FRONTEND

COPY templates/package.json $FRONTEND
COPY templates/package-lock.json $FRONTEND
RUN npm install

COPY templates/ $FRONTEND
RUN npm run build

# This file is a template, and might need editing before it works on your project.
FROM python:3.7.0

# Edit with mysql-client, postgresql-client, sqlite3, etc. for your needs.
# Or delete entirely if not needed.
# RUN apt-get update \
#     && apt-get install -y --no-install-recommends \
#         postgresql-client \
#     && rm -rf /var/lib/apt/lists/*

ENV HOME=/opt/app

WORKDIR $HOME

COPY requirements.txt $HOME
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir -r requirements.txt

COPY . $HOME

# Copy frontend from the first stage
COPY --from=0 /opt/templates/build templates/build

# For Django
EXPOSE 80
ENV PYTHONUNBUFFERED=true
CMD ["/bin/sh", "./run.sh"]
