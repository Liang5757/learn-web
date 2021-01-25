create table if not exists t_manager(
    aid int primary key auto_increment,
    aname varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
) default charset = utf8;

insert into t_manager values(1,'liang','123','123');
insert into t_manager values(2,'admin','admin','123');

commit;

