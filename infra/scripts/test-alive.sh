#!/bin/bash
echo "# Test website is up"

sudo apt install -y ca-certificates
set +e
timeout=900;
elapse=0;
range=10;
test_result=1
TAG=$(make get-current-version)

until [ "$elapse" -ge "$timeout" -o "$test_result" -eq "0" ] ; do
        [[ "$(curl -L -s $1/api/version)" == "$TAG" ]]
        test_result=$?
        if [ "$test_result" -gt "0" ] ; then
            echo "Waited $elapse seconds";
            ((elapse=elapse+$range))
            sleep $range
        fi
done
if [ "$test_result" -gt "0" ] ; then
        ret=$test_result
        echo "ERROR: url does not respond or version not updated"
        exit 1
fi
