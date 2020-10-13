// In my solution, I aimed to write performant iteration instead of using ES6 functions like `findIndex, some`
// In case of given big big file/folder structure, I tried to make sure that there won't be any unnecessary iteration

type File = {
  id: string;
  name: string;
};

type Folder = {
  id: string;
  name: string;
  files: File[];
};

type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  // Keep all necessary indexes to move file quickly
  let sourceFileIndex = -1;
  let sourceFolderIndex = -1;
  let destinationFolderIndex = -1;

  for (let i = 0; i < list.length; i += 1) {
    const { id, files } = list[i];

    if (id === source) {
      // test case 2
      throw new Error('You cannot move a folder');
    }

    if (id === destination) {
      destinationFolderIndex = i;
    }

    if (destinationFolderIndex > -1 && sourceFileIndex > -1) break;

    for (let j = 0; j < files.length; j += 1) {
      // test case 3
      if (files[j].id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }

      if (files[j].id === source) {
        sourceFileIndex = j;
        sourceFolderIndex = i;
        break;
      }
    }
  }

  // (+1) test case 4
  if (destinationFolderIndex === -1) {
    throw new Error('Given destination id did not match any folder');
  }

  // (+1) test case 5
  if (sourceFolderIndex === -1) {
    throw new Error('Given source id of file was not found in any folder');
  }

  // as described in READ.ME.md (returns the new state of given list), source list is mutating
  list[destinationFolderIndex].files.push(
    ...list[sourceFolderIndex].files.splice(sourceFileIndex, 1),
  );

  return list;
}
