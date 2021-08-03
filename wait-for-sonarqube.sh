#!/bin/sh
# wait-for-sonarqube.sh

set -e
  
host="$1"
shift
  
until wget -qS --spider "$host" 2>&1 | grep -c 'HTTP/.* 200' &> /dev/null; do
  >&2 echo "Sonarqube web server is unavailable - sleeping"
  sleep 5
done

until wget -qO- "$host/api/system/status" | grep -c '"status":"UP"' &> /dev/null; do
  >&2 echo "Sonarqube unavailable - sleeping"
  sleep 10
done
  
>&2 echo "Sonarqube is up - executing command"
exec "$@"