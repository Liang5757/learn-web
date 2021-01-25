create table if not exists t_hire(
    wid int,
    sid int,
    employment_period date NOT NULL,
    salary int NOT NULL,
    primary key(wid, sid)
) default charset = utf8;

insert into t_hire values('1','1', '2020-12-20', '10000');
insert into t_hire values('2','2', '2020-12-22', '2000');

commit;

