import fs from "fs";

const deletefile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
    // eslint-disable-next-line no-empty
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
};

export { deletefile };
