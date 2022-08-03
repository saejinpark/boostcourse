import Path from './Path.js';

describe('constructor test', () => {
  it('UNIX TYPE Path', () => {
    const p1 = new Path('/home/user/boost/camp/challenge/day12/problem.md');
    expect(p1.root).toBe('/');
    expect(p1.base).toBe('problem.md');
    expect(p1.ext).toBe('md');
    expect(p1.name).toBe('problem');
    expect(p1.lastDirectory).toBe('day12');
    // expect(p1.components).toStrictEqual(['C:\\', 'home', 'user', 'hi.txt']);
  });
  it('WINDOW TYPE Path', () => {
    const p1 = new Path('C:\\home\\user\\hi.txt');
    expect(p1.root).toBe('C:\\');
    expect(p1.base).toBe('hi.txt');
    expect(p1.ext).toBe('txt');
    expect(p1.name).toBe('hi');
    expect(p1.lastDirectory).toBe('user');
    expect(p1.components).toStrictEqual(['C:\\', 'home', 'user', 'hi.txt']);
  });
});

it('filename ext check', () => {
  try {
    const path1 = new Path('/first/second/last/param');
  } catch (err) {
    expect(e.message).toBe('파일명의 확장자가 포함돼있지 않습니다');
  }
});

it('append Components test(WINDOW)', () => {
  const p1 = new Path('C:\\home\\user\\hi.txt');
  expect(p1.components).toStrictEqual(['C:\\', 'home', 'user', 'hi.txt']);
  p1.appendComponent('base');
  expect(p1.components).toStrictEqual(['C:\\', 'home', 'user', 'base', 'hi.txt']);
});

it('append Components test(UNIX)', () => {
  const p1 = new Path('/home/user/day12/problem.md');
  expect(p1.components).toStrictEqual(['/', 'home', 'user', 'day12', 'problem.md']);
  p1.appendComponent('base');
  expect(p1.components).toStrictEqual(['/', 'home', 'user', 'day12', 'base', 'problem.md']);
});

it('relative test', () => {
  const path1 = new Path('/first/second/last/param.js');
  expect(path1.relative('/first/second/most/jk')).toBe('../../most/jk');
  expect(path1.relative('/second/most/jk')).toBe('../../../../second/most/jk');
});

it('get absolute string test', () => {
  const path1 = new Path('/first/second/last/param.js');
  const absString = path1.getAbsoluteString();
  expect(absString).toBe('/first/second/last/param.js');
});

it('delete last directory', () => {
  const path = new Path('/home/user/boost/camp/challenge/day12/problem.md');
  path.appendComponent('base');
  path.appendComponent('camp');
  let absString = path.getAbsoluteString();
  expect(absString).toBe('/home/user/boost/camp/challenge/day12/base/camp/problem.md');
  path.deleteLastComponent();
  absString = path.getAbsoluteString();
  expect(absString).toBe('/home/user/boost/camp/challenge/day12/base/problem.md');
});

it('is absolute String non writable', () => {
  const path = new Path('/home/user/boost/camp/challenge/day12/problem.md');
  try {
    path.absoluteString = 'hi';
  } catch (err) {
    expect(err.message).toBe("Cannot assign to read only property 'absoluteString' of object '#<Path>'");
  }
});

it('setRoot UNIX type and WINDOW type', () => {
  const UPath = new Path('/home/user/boost/camp/challenge/day12/problem.md');
  expect(UPath.root).toBe('/');
  const WPath = new Path('C:\\home\\user\\hi.txt');
  expect(WPath.root).toBe('C:\\');
  WPath.setRoot('D:\\home\\user\\hi.txt');
  expect(WPath.root).toBe('D:\\');
});

it('stringify test', () => {
  const path = new Path('/first/second/last/param.js');
  const str = path.stringify();
  expect(str).toEqual({
    base: 'param.js',
    components: ['/', 'first', 'second', 'last', 'param.js'],
    ext: 'js',
    ld: 'last',
    name: 'param',
    root: '/',
  });
});

it('makePaths', () => {
  const manyPaths = '/first/second/last/param.js:/home/boost/camp/verygood.js';
  const path = new Path(manyPaths);
  expect(path.paths.length).toBe(2);
  expect(path.checkManyPaths(manyPaths)).toBe(true);
  expect(path.makeThisPaths(manyPaths).length).toBe(4);
  expect(path.paths.length).toBe(4);
});

it('dir check', () => {
  const UPath = new Path('/home/user/boost/problem.md');
  expect(UPath.dir).toBe('/home/user/boost');
  const WPath = new Path('C:\\home\\user\\hi.txt');
  expect(WPath.dir).toBe('C:\\home\\user');
});
