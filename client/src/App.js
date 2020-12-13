import React, { useEffect, useState } from "react";
import Calendar from "./components/Calendar.js";
import * as api from "./api/apiService";
import Transaction from "./components/Transaction.js";
import TransactionResume from "./components/TransactionResume.js";
import ModalTransaction from "./components/ModalTransaction.js";
import ModalNewTransaction from "./components/ModalNewTransaction";

let originalTransactions = [];

export default function App() {
  const [yearMonth, setYearMonth] = useState("2020-11");
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [isModalNewTransactionOpen, setIsModalNewTransactionOpen] = useState(
    false
  );

  useEffect(() => {
    const getInitialTransactions = async () => {
      const transactionsFound = await api.getTransactionsByPeriod("2020-11");
      originalTransactions = transactionsFound;
      setTimeout(() => {
        setTransactions(transactionsFound);
      }, 2000);
    };
    getInitialTransactions();
  }, []);

  useEffect(() => {
    const getNewTransactions = async () => {
      const newTransactions = await api.getTransactionsByPeriod(yearMonth);
      originalTransactions = newTransactions;
      setTransactions(newTransactions);
    };
    getNewTransactions();
  }, [yearMonth]);

  const handleYearMonthChange = (yearMonth) => {
    setYearMonth(yearMonth);
  };

  const handleDeleteButton = async (id) => {
    console.log(id);
    const res = await api.deleteTransactionById(id);
    const newTransactions = transactions.filter((tran) => {
      return tran._id !== id;
    });
    originalTransactions = newTransactions;
    setTransactions(newTransactions);
  };

  const handleFilter = (event) => {
    const filterUpperCase = event.target.value.trim().toUpperCase();
    if (filterUpperCase) {
      const transactionsFiltered = originalTransactions.filter((tran) => {
        return tran.description.toUpperCase().includes(filterUpperCase);
      });
      setTransactions(transactionsFiltered);
    } else {
      setTransactions(originalTransactions);
    }
  };

  const handleUpdateButton = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsModalNewTransactionOpen(false);
  };

  const handlePersist = (transaction) => {
    console.log(transaction);
    const newTransactions = transactions.map((tran) => {
      if (tran._id === transaction._id) {
        tran.category = transaction.category;
        tran.description = transaction.description;
        tran.value = parseInt(transaction.value);
        console.log(tran);
        return tran;
      } else {
        return tran;
      }
    });
    setTransactions(newTransactions);
    api.updateTransactionById(transaction);
  };

  const handleOpenNewTransactionModal = () => {
    setIsModalNewTransactionOpen(true);
  };

  const handleCreateNewTransaction = (transaction) => {
    const createTransaction = async (transaction) => {
      const newTransaction = await api.createTransaction(transaction);
      if (newTransaction.yearMonth === yearMonth) {
        const newTransactions = [...transactions, newTransaction];
        setTransactions(newTransactions);
      }
    };
    createTransaction(transaction);
  };

  return (
    <div className="container">
      <Calendar onYearMonthChange={handleYearMonthChange} />
      <TransactionResume transactions={transactions} />
      <div style={styles.flexRow} className="container">
        <button className="btn" onClick={handleOpenNewTransactionModal}>
          ADICIONAR
        </button>
        <input
          id="inputName"
          type="text"
          style={{ marginLeft: "10px" }}
          onChange={handleFilter}
        />
      </div>
      <ul className="container">
        {transactions.map((transaction) => {
          return (
            <Transaction
              transaction={transaction}
              onDelete={handleDeleteButton}
              onUpdate={handleUpdateButton}
            />
          );
        })}
      </ul>
      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersist}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}
      {isModalNewTransactionOpen && (
        <ModalNewTransaction
          onSave={handleCreateNewTransaction}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px",
    marginTop: "10px",
  },
};
