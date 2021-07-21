#!/usr/bin/env bash

# Configure Blackfire Repository
wget -q -O - https://packages.blackfire.io/gpg.key | apt-key add -
echo "deb http://packages.blackfire.io/debian any main" | tee /etc/apt/sources.list.d/blackfire.list
apt-get update

# Install Blackfire Agent
apt-get install blackfire -y

printf "%s\n" $BLACKFIRE_SERVER_ID $BLACKFIRE_SERVER_TOKEN | blackfire agent:config
printf "%s\n" $BLACKFIRE_CLIENT_ID $BLACKFIRE_CLIENT_TOKEN | blackfire client:config

# Start blackfire on-boot
/etc/init.d/blackfire-agent restart

# Install Blackfire Probe
apt-get install blackfire-php

# Enable Blackfire Probe
docker-php-ext-enable blackfire
