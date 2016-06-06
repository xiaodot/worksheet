#!/bin/bash
#
# Start the webserver.
#
WsBase=../log/webserver-$(hostname)-9000
PidFile=$WsBase.pid
if [ -f $PidFile ] ; then
    Pid=$(cat $PidFile)
    if kill -0 $Pid 2>&1 >/dev/null ; then
	echo "ERROR: webserver is already running, PID=$Pid"
	exit 1
    else
	# The process does not exist, remove the pid file.
	rm -f $PidFile
    fi
fi
./webserver.py -H cpdaxue.com -p 9000 -l debug --no-dirlist -r ../app -d ../log
echo "started"
