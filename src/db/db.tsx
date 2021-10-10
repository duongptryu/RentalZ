import { IDBPDatabase, openDB } from "idb";
import { HouseRental } from "../model/house";

class IndexedDb {
  private database: string;
  private db: any;

  constructor(database: string) {
    this.database = database;
  }

  public async createObjectStore(tableNames: string[]) {
    try {
      this.db = await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase) {
          for (const tableName of tableNames) {
            if (db.objectStoreNames.contains(tableName)) {
              continue;
            }
            db.createObjectStore(tableName, {
              autoIncrement: true,
              keyPath: "id",
            });
          }
        },
      });
    } catch (error) {
      return false;
    }
  }

  public async getValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    return result;
  }

  public async getAllValue(tableName: string) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    return result;
  }

  public async putValue(tableName: string, value: object) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    return result;
  }

  public async updateValue(tableName: string, value: HouseRental, id: number) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    let data = await store.get(id);
    data.BedRoom = value.BedRoom;
    data.PropertyType = value.PropertyType;
    data.PricePerMonth = value.PricePerMonth;
    data.Furniture = value.Furniture;
    data.Notes = value.Notes;
    data.NameReporter = value.NameReporter;
    data.Tag = value.Tag;
    data.Title = value.Title;
    data.Location = value.Location;
    const result = await store.put(data);
    return result;
  }

  public async deleteValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log("Id not found", id);
      return result;
    }
    await store.delete(id);
    console.log("Deleted Data", id);
    return id;
  }
}

export default IndexedDb;
