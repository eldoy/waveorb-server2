#!/bin/bash

apt-get update && apt-get -y install curl
curl https://raw.githubusercontent.com/eldoy/waveorb-server2/master/install.sh | sh
