import { uuid } from 'uuidv4';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (balance.total < value) {
        throw Error('Balance is not enough!');
      }
    }

    const transaction = this.transactionsRepository.create({
      id: uuid(),
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
