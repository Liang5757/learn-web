let staff = {
  insert: 'insert into t_warehouse(wname, address, cid) VALUES(?,?,?)',
  delete: 'delete from t_warehouse where wid in (?)',
  queryAll: 'select * from t_warehouse order by wid desc',
  queryByName: 'select * from t_warehouse where wname = (?)'
};

module.exports = staff;
