class UnionFind {
  constructor() {
    this.parent = new Map();
    this.count = n;
  }

  // ����Ԫ�����ڼ���
  find(x) {
    while (this.parent.has(x)) {
      x = this.parent.get(x);
    }
    return x;
  }

  // �ϲ���������
  union(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);
    if (rootP !== rootQ) {
      this.parent.set(this.find(p), this.find(q));
      this.count--;
    }
  }
}
