FROM docker.io/elastic/filebeat:6.5.4
USER root
RUN ls
RUN grep -rlw http /etc |while read i ;do sed -ri 's#\b80\b#8080#' ${i} ; sed -ri 's#\b443\b#6443#' ${i} ;done
RUN find / -xdev -exec chmod -f -c g=u {} \; -exec chown -f -c 1001:root {} \; >/dev/null 2>&1
RUN grep -w 1001 /etc/passwd ||echo "rootless:x:1001:0:root:/root:/bin/bash" >>/etc/passwd
USER 1001