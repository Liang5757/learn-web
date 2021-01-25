let manager = {
  insert: 'insert into t_manager(aname, username, password) VALUES(?,?,?)',
  delete: 'delete from t_manager where aid in (?)',
  queryAll: 'select * from t_manager order by aid desc',
  query: 'select * from t_manager where aname = (?)'
};

module.exports = manager;
