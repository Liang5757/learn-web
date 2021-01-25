create table if not exists t_company (
    cid int primary key auto_increment,
    cname varchar(255) NOT NULL,
    address varchar(255),
    aid int,
    foreign key(aid) references t_manager(aid) on delete cascade
) default charset = utf8;

insert into t_company values(1,'阿里','北京路',1);
insert into t_company values(2,'腾讯','上下九',2);

commit;

