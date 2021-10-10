import { DB_NAME, PROJECT_TABLE } from "../config.json";
import IndexedDb from "../db/db";

export class HouseRental {
  PropertyType: string;
  BedRoom: string;
  PricePerMonth: Number;
  Furniture: string[];
  Notes: string;
  NameReporter: string;
  Tag: string;
  CreatedAt: string;
  Title: string;
  Location: string;
  DataBlob: Blob
  Comments: any

  constructor(
    propertyType: string,
    bedRoom: string,
    pricePerMonth: number,
    furniture: string[],
    notes: string,
    nameReporter: string,
    tag: string,
    location: string,
    title: string,
    dataBlob: Blob
  ) {
    this.BedRoom = bedRoom;
    this.PropertyType = propertyType;
    this.PricePerMonth = pricePerMonth;
    this.Furniture = furniture;
    this.Notes = notes;
    this.NameReporter = nameReporter;
    this.Tag = tag;
    this.CreatedAt = new Date().toLocaleString("vi-VN");
    this.Title = title
    this.Location = location
    this.DataBlob = dataBlob
    this.Comments = []
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

  public async Update(id: number) {
    const db = new IndexedDb(DB_NAME);
    await db.createObjectStore([PROJECT_TABLE]);
    try {
      let result = await db.updateValue(PROJECT_TABLE, this, id);
      return result;
    } catch (e) {
      console.log(e);
      throw new Error("Error server, please try again!");
    }
  }
  
  static async AddComment(id: number, new_list_comment: any) {
    const db = new IndexedDb(DB_NAME);
    await db.createObjectStore([PROJECT_TABLE]);
    try {
      let result = await db.addComment(PROJECT_TABLE, new_list_comment, id);
      return result;
    } catch (e) {
      console.log(e);
      throw new Error("Error server, please try again!");
    }
  }

  static async GetAProject(id: number){
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

  static async DeleteProject(id: number) {
    const db = new IndexedDb(DB_NAME);
    await db.createObjectStore([PROJECT_TABLE]);
    try {
      let result = await db.deleteValue(PROJECT_TABLE, id);
      return result;
    } catch (e) {
      throw new Error("Error server, please try again!");
    }
  }
}
