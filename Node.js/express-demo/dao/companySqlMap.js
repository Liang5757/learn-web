let company = {
  insert: 'insert into t_company(cname, address, aid) VALUES(?,?,?)',
  delete: 'delete from t_company where cid in (?)',
  queryAll: 'select * from t_company order by cid desc',
  queryByName: 'select * from t_company where cname = (?)'
};

module.exports = company;
