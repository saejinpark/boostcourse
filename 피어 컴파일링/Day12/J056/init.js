import fs from 'fs';
const init = (root) => {
  const MIT_DIRECORY = `${root}/.mit`;
  const MIT_OBJECT_DIRECORY = `${MIT_DIRECORY}/objects`;
  const MIT_INDEX_DIRECORY = `${MIT_DIRECORY}/index`;

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
    if (!fs.existsSync(MIT_DIRECORY)) {
      fs.mkdirSync(MIT_DIRECORY);
      fs.mkdirSync(MIT_OBJECT_DIRECORY);
      fs.mkdirSync(MIT_INDEX_DIRECORY);
    }
  }
};

export default init;
