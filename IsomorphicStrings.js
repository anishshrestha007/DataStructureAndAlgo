function isIsomorphic(s, t) {
  let map = new Map();
  let map1 = new Map();
  const strArr1 = s.split("");
  const strArr2 = t.split("");
  debugger;
  for (let index = 0; index < strArr1.length; index++) {
    const element1 = strArr1[index];
    const element2 = strArr2[index];
    if (!map.get(element1)) {
      map.set(element1, element2);
    }
    if (!map1.get(element2)) {
      map1.set(element2, element1);
    }
    if (map.get(element1) !== element2 || map1.get(element2) !== element1) {
      return false;
    }
  }
  return true;
}

isIsomorphic("badc", "baba");
