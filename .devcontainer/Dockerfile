FROM ubuntu:24.04

RUN apt-get update \
 && apt-get install -y \
    curl \
    git \
    ca-certificates \
    build-essential \
    python3 \
    python3-pip \
    python3-venv \
 && ln -sf /usr/bin/python3 /usr/bin/python \
 && curl -sSL https://install.python-poetry.org | python3 - \
 && rm -rf /var/lib/apt/lists/*

SHELL ["/bin/bash", "-lc"]

ENV NVM_DIR=/root/.nvm
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Install NVM + Node + pnpm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash \
 && source "$NVM_DIR/nvm.sh" \
 && nvm install 24 \
 && nvm alias default 24 \
 && corepack enable pnpm

# Persist Node, npm, pnpm to PATH globally
ENV PATH="$NVM_DIR/versions/node/v24.12.0/bin:$PATH"
ENV PATH="/root/.local/bin:$PATH"

RUN node -v
RUN npm -v
RUN pnpm -v

# Bun
RUN npm install -g bun
RUN bun -v

RUN apt-get update && \
    apt-get install -y openssh-server && \
    mkdir /var/run/sshd

RUN passwd root -d

RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    sed -i 's/#PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]