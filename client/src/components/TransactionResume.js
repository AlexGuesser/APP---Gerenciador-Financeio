import React from "react";

export default function TransactionResume({ transactions }) {
  const numberOfTransactions = transactions.length;
  const revenues = transactions
    .filter((transaction) => {
      return transaction.type === "+";
    })
    .reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

  const expenses =
    transactions
      .filter((transaction) => {
        return transaction.type === "-";
      })
      .reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0) * -1;

  const balance = revenues + expenses;

  const balanceClass = balance >= 0 ? styles.revenue : styles.expense;

  return (
    <div className="container" style={styles.flex}>
      <div>
        <strong>Lançamentos: </strong>
        {numberOfTransactions}
      </div>
      <div>
        <strong>Receitas: </strong>
        <span style={styles.revenue}>{`R$ ${revenues}.00`}</span>
      </div>
      <div>
        <strong>Despesas: </strong>
        <span style={styles.expense}>{`R$ ${expenses}.00`}</span>
      </div>
      <div>
        <strong>Saldo: </strong>
        <span style={balanceClass}>{`R$ ${balance}.00`}</span>
      </div>
    </div>
  );
}

const styles = {
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "5px",
    marginTop: "10px",
  },
  revenue: {
    color: "green",
  },
  expense: {
    color: "red",
  },
};
