create table if not exists t_warehouse(
    wid int primary key auto_increment,
    wname varchar(255) NOT NULL,
    address varchar(255),
    cid int,
    foreign key(cid) references t_company(cid) on delete cascade
) default charset = utf8;

insert into t_warehouse values('1','w1', '天河', 1);
insert into t_warehouse values('2','w2', '海珠', 2);

commit;

