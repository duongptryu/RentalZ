import { DB_NAME, PROJECT_TABLE } from "../config.json";
import IndexedDb from "../db/db";

export class HouseRental {
  private PropertyType: string;
  private BedRoom: string;
  private PricePerMonth: Number;
  private Furniture: string[];
  private Notes: string;
  private NameReporter: string;
  private Tag: string;
  private CreatedAt: string;

  constructor(
    propertyType: string,
    bedRoom: string,
    pricePerMonth: number,
    furniture: string[],
    notes: string,
    nameReporter: string,
    tag: string
  ) {
    this.BedRoom = bedRoom;
    this.PropertyType = propertyType;
    this.PricePerMonth = pricePerMonth;
    this.Furniture = furniture;
    this.Notes = notes;
    this.NameReporter = nameReporter;
    this.Tag = tag;
    this.CreatedAt = new Date().toLocaleString("vi-VN");
  }

  public async Add() {
    const db = new IndexedDb(DB_NAME);
    await db.createObjectStore([PROJECT_TABLE]);
    try {
      let result = await db.putValue(PROJECT_TABLE, this);
      return result;
    } catch (e) {
      console.log(e);
      throw new Error("Error server, please try again!");
    }
  }

  public async GetAProject(id: number) {
    const db = new IndexedDb(DB_NAME);
    await db.createObjectStore([PROJECT_TABLE]);
    try {
      let result = await db.getValue(PROJECT_TABLE, id);
      return result;
    } catch (e) {
      throw new Error("Error server, please try again!");
    }
  }

  static async GetProjects() {
    const db = new IndexedDb(DB_NAME);
    await db.createObjectStore([PROJECT_TABLE]);
    try {
      let result = await db.getAllValue(PROJECT_TABLE);
      return result;
    } catch (e) {
      throw new Error("Error server, please try again!");
    }
  }
}
