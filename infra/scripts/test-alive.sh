#!/bin/bash
echo "# Test preprod is up"

sudo apt install -y ca-certificates
set +e
timeout=300;
elapse=0;
range=10;
test_result=1

until [ "$elapse" -ge "$timeout" -o "$test_result" -eq "0" ] ; do
        [[ "$(curl -L -k -s $1/api/)" == "Basegun backend" ]]
        test_result=$?
        if [ "$test_result" -gt "0" ] ; then
            echo "Waited $elapse seconds";
            ((elapse=elapse+$range))
            sleep $range
        fi
done
if [ "$test_result" -gt "0" ] ; then
        ret=$test_result
        echo "ERROR: url does not respond"
        exit 1
fi