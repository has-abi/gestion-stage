export class Global {
  NewConfirmed:number;
  TotalConfirmed:number;
  NewDeaths:number;
  TotalDeaths:number;
  NewRecovered:number;
  TotalRecovered:number;

  constructor() {
    this.NewConfirmed = 0;
    this.NewDeaths = 0;
    this.NewRecovered = 0;
    this.TotalConfirmed = 0;
    this.TotalDeaths = 0;
    this.TotalRecovered = 0;
  }
}
