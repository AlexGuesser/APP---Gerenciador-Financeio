import React from "react";

export default function Transaction({ transaction, onDelete, onUpdate, id }) {
  const { category, description, value, type } = transaction;

  const handleDeleteButton = (event) => {
    onDelete(transaction._id);
  };

  const handleUpdateButton = (event) => {
    onUpdate(transaction);
  };

  const classTransaction = type === "+" ? styles.revenue : styles.expense;
  return (
    <div style={classTransaction}>
      <div style={classTransaction}>
        <div>
          <div>
            <strong>{category}</strong>
          </div>
          <div>{description}</div>
        </div>
        <div>
          <strong>{`R$ ${value}.00`}</strong>
        </div>
      </div>
      <button className="badge badge-danger mr-2" onClick={handleDeleteButton}>
        Excluir
      </button>
      <button
        type="submit"
        className="badge badge-success"
        onClick={handleUpdateButton}
      >
        Editar
      </button>
    </div>
  );
}

const styles = {
  expense: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "5px",
    width: "100%",
    marginTop: "10px",
    padding: "5px",
    backgroundColor: "#ff704d",
  },

  revenue: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "5px",
    width: "100%",
    marginTop: "10px",
    padding: "5px",
    backgroundColor: "#c1ff80",
  },
};
