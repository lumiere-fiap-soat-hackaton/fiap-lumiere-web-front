/**
 * BrowserStorage - A service that provides local caching for S3 bucket operations
 * Works as a secondary cache after the actual bucket requests succeed
 */

interface StorageObject {
  key: string;
  data: Blob;
  contentType: string;
  lastModified: number;
  url?: string; // Optional URL to the real bucket object
}

export interface StorageMetadata {
  key: string;
  size: number;
  contentType: string;
  lastModified: number;
  url?: string;
}

class BrowserStorageService {
  private readonly DB_NAME = 'objectCache';
  private readonly STORE_NAME = 'files';
  private readonly DB_VERSION = 1;

  /**
   * Opens the IndexedDB database
   */
  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = (event) => {
        console.error('IndexedDB error:', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'key' });
        }
      };
    });
  }

  /**
   * Cache an object after it's been successfully uploaded to S3
   * @param key - The object key (filename)
   * @param data - The file data
   * @param contentType - The file content type
   * @param url - Optional URL to the actual S3 object
   */
  async cacheObject(key: string, data: Blob, contentType: string, url?: string): Promise<void> {
    try {
      const db = await this.openDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);

        const storageObject: StorageObject = {
          key,
          data,
          contentType,
          lastModified: Date.now(),
          url
        };

        const request = store.put(storageObject);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
      });
    } catch (error) {
      console.error('Failed to cache object:', error);
      // Fail silently - caching is optional
    }
  }

  /**
   * Get a cached object
   * @param key - The object key (filename)
   */
  async getCachedObject(key: string): Promise<{ data: Blob; contentType: string; url?: string } | null> {
    try {
      const db = await this.openDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readonly');
        const store = transaction.objectStore(this.STORE_NAME);

        const request = store.get(key);

        request.onsuccess = () => {
          const storageObject: StorageObject | undefined = request.result;
          if (storageObject) {
            resolve({
              data: storageObject.data,
              contentType: storageObject.contentType,
              url: storageObject.url
            });
          } else {
            resolve(null);
          }
        };

        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
      });
    } catch (error) {
      console.error('Failed to get cached object:', error);
      return null;
    }
  }

  /**
   * Delete a cached object
   * @param key - The object key (filename)
   */
  async deleteCachedObject(key: string): Promise<void> {
    try {
      const db = await this.openDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);

        const request = store.delete(key);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
      });
    } catch (error) {
      console.error('Failed to delete cached object:', error);
      // Fail silently
    }
  }

  /**
   * List all cached objects
   */
  async listCachedObjects(): Promise<StorageMetadata[]> {
    try {
      const db = await this.openDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readonly');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.openCursor();
        const objects: StorageMetadata[] = [];

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            const { key, data, lastModified, contentType, url } = cursor.value;
            objects.push({
              key,
              size: data.size,
              contentType,
              lastModified,
              url
            });
            cursor.continue();
          } else {
            resolve(objects);
          }
        };

        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
      });
    } catch (error) {
      console.error('Failed to list cached objects:', error);
      return [];
    }
  }

  /**
   * Clear all cached objects
   */
  async clearCache(): Promise<void> {
    try {
      const db = await this.openDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);

        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
      });
    } catch (error) {
      console.error('Failed to clear cache:', error);
      // Fail silently
    }
  }

  /**
   * Check if object exists in cache
   * @param key - The object key (filename)
   */
  async isCached(key: string): Promise<boolean> {
    try {
      const cached = await this.getCachedObject(key);
      return cached !== null;
    } catch {
      return false;
    }
  }
}

export const browserStorage = new BrowserStorageService();
