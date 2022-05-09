#!/bin/bash
echo "# Test preprod is up"
set +e
timeout=120;
elapse=10;
test_result=1

until [ "$timeout" -le 0 -o "$test_result" -eq "0" ] ; do
        [[ "$(curl $1/api/)" == "Basegun backend" ]]
        test_result=$?
        if [ "$test_result" -gt "0" ] ; then
            echo "Wait $elapse seconds";
            ((timeout=timeout-$elapse))
            sleep $elapse
        fi
done
if [ "$test_result" -gt "0" ] ; then
        ret=$test_result
        echo "ERROR: url does not respond"
        exit 1
fi