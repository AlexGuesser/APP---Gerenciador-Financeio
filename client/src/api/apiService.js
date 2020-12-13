import axios from "axios";

const API_URL = "http://localhost:3001/api/transaction";

async function getTransactionsByPeriod(yearMonth) {
  const res = await axios.get(API_URL, {
    params: { period: yearMonth },
  });
  return res.data.transactions;
}

async function deleteTransactionById(id) {
  const res = await axios.delete(API_URL + `/${id}`);
  return res;
}

async function updateTransactionById(transaction) {
  const res = await axios.put(API_URL + `/${transaction._id}`, transaction);
  return res;
}

async function createTransaction(transaction) {
  const year = transaction.yearMonthDay.slice(0, 4);
  const month = transaction.yearMonthDay.slice(5, 7);
  const day = transaction.yearMonthDay.slice(8);
  const yearMonth = `${year}-${month}`;
  transaction = { ...transaction, year, month, day, yearMonth };
  const newTransaction = await axios.post(API_URL, transaction);
  console.log(newTransaction.data);
  return newTransaction.data;
}

export {
  getTransactionsByPeriod,
  deleteTransactionById,
  updateTransactionById,
  createTransaction,
};
