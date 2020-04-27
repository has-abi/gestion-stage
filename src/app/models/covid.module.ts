import {Country} from "./country.module";
import {Global} from "./global.model";

export class Covid {
  Global:Global
  Countries:Array<Country>;
  Date:Date;

  constructor() {
    this.Countries = new Array<Country>();
    this.Global = new Global();
    this.Date = new Date();
  }
}
