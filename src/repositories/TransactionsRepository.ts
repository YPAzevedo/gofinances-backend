import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].type === 'income') {
        income = Number(this.transactions[i].value) + Number(income);
      } else if (this.transactions[i].type === 'outcome') {
        outcome = Number(this.transactions[i].value) + Number(outcome);
      }
    }

    const total: number = income - outcome;
    const bal: Balance = { income, outcome, total };
    return bal;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const trans = new Transaction({ title, value, type });
    this.transactions.push(trans);

    return trans;
  }
}

export default TransactionsRepository;
