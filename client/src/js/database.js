import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Add the content to the database
  const result = await store.add({ content });

  // Wait for the transaction to complete
  await tx.done;

  return result;
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Retrieve all content from the object store
  const allContent = await store.getAll();

  // Wait for the transaction to complete
  await tx.done;

  return allContent;
};

initdb();
