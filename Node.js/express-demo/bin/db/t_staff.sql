create table if not exists t_staff(
    sid int primary key auto_increment,
    sname varchar(255) NOT NULL,
    address varchar(255),
    sex char
) default charset = utf8;

insert into t_staff values('1','s1', '天河', '女');
insert into t_staff values('2','s2', '海珠', '男');

commit;
