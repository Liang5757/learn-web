#!/bin/bash
mysql -uroot -p123456 --default-character-set=utf8 <<EOF
drop database if exists warehouse_manager;
create database warehouse_manager character set utf8;
use warehouse_manager;
source init.sql;
EOF
cmd /k
