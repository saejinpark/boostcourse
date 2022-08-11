const reg = /\([\w, ]+\) VALUES \([\w, "]+\)/i
console.log(reg.test('(singer, year, song) VALUES ("10CM", 2018, "Perfect")'));