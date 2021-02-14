// DB��
const MongoDB = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = MongoDB.ObjectID;
const { dbUrl, dbName } = require("./config.js");

class Db {
  static getInstance() {   /*1������ ���ʵ����ʵ�������������*/
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  constructor() {
    this.dbClient = null; /* ���� ��db���� */
    this.connect();   /* ʵ������ʱ����������ݿ� */
  }

  connect() {  /* �������ݿ� */
    let _that = this;
    return new Promise((resolve, reject) => {
      if (!_that.dbClient) {         /* 1��������ݿ������ӵ����� */
        MongoClient.connect(dbUrl, (err, client) => {
          if (err) {
            reject(err);
          } else {
            _that.dbClient = client.db(dbName);
            resolve(_that.dbClient);
          }
        });
      } else {
        resolve(_that.dbClient);
      }
    });

  }

  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        let result = db.collection(collectionName).find(json);
        result.toArray(function (err, docs) {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        });
      });
    });
  }

  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        //db.user.update({},{$set:{}})
        db.collection(collectionName).updateOne(json1, {
          $set: json2,
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }

  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).insertOne(json, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }

  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).removeOne(json, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }

  getObjectId(id) {    /*mongodb�����ѯ _id ���ַ���ת���ɶ���*/
    return new ObjectID(id);
  }
}

module.exports = Db.getInstance();
