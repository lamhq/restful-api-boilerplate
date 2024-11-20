import { Expose } from 'class-transformer';

export class Revenue {
  @Expose()
  income: number;

  @Expose()
  outcome: number;

  constructor(income: number, outcome: number) {
    this.income = income;
    this.outcome = outcome;
  }
}
