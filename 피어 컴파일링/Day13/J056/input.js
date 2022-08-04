import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = async () => {
  const info = {
    from: null,
    to: null,
    title: null,
    content: null,
  };
  info.from = await new Promise((resolve) => {
    rl.question('받을 사람의 이메일을 입력해주세요.\n', resolve);
  });
  info.to = await new Promise((resolve) => {
    rl.question('보내는 사람의 이메일을 입력해주세요.\n', resolve);
  });
  info.title = await new Promise((resolve) => {
    rl.question('메일 제목을 입력해주세요.\n', resolve);
  });
  info.content = await new Promise((resolve) => {
    rl.question('메일 내용을 입력해주세요.\n', resolve);
  });
  rl.close();
  return info;
};

export default input;
