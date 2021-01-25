class UnionFind {
  constructor(n) {
    this.roots = new Array(n).fill(0).map((item, index) => index);
  }

  find(element) {
    if (this.roots[element] === element) {
      return element
    }

    return this.roots[element] = this.find(this.roots[element]);
  }

  union(element1, element2) {
    let root1 = this.find(element1);
    let root2 = this.find(element2);

    if (root1 !== root2) {
      this.roots[root1] = root2;
    }
  }
}
