import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import * as api from "../api/apiService";

Modal.setAppElement("#root");

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const { _id, category, description, value, type } = selectedTransaction;
  console.log(type);
  const revenueChecked = type === "+";
  const expenseChecked = type === "-";
  console.log(revenueChecked);
  console.log(expenseChecked);
  const [categoryTransaction, setCategoryTransaction] = useState(category);
  const [descriptionTransaction, setDescriptionTransaction] = useState(
    description
  );
  const [valueTransaction, setValueTransaction] = useState(value);

  const handleClose = () => {
    onClose(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const transaction = {
      _id: _id,
      category: categoryTransaction,
      description: descriptionTransaction,
      value: valueTransaction,
    };
    onSave(transaction);
    onClose(null);
  };

  const handleChange = (event) => {
    const eventId = event.target.id;
    const value = event.target.value;
    switch (eventId) {
      case "inputCategory":
        setCategoryTransaction(value);
        break;

      case "inputDescription":
        setDescriptionTransaction(value);
        break;

      case "inputValue":
        setValueTransaction(value);
        break;
    }
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de Transações</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <div style={styles.divRadioButtons}>
          <label>
            <input
              name="group1"
              type="radio"
              checked={revenueChecked}
              disabled={true}
            />
            <span>Receita </span>
          </label>

          <label style={{ marginLeft: "10px" }}>
            <input
              name="group1"
              type="radio"
              checked={expenseChecked}
              disabled={true}
            />
            <span>Despesa</span>
          </label>
        </div>

        <div className="input-field">
          <input
            value={categoryTransaction}
            id="inputCategory"
            type="text"
            onChange={handleChange}
          />
          <label className="active" htmlFor="inputSubject">
            Categoria:
          </label>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input
              value={descriptionTransaction}
              id="inputDescription"
              type="text"
              onChange={handleChange}
            />
            <label className="active" htmlFor="inputName">
              Descrição:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputValue"
              type="number"
              step="10"
              autoFocus
              value={valueTransaction}
              onChange={handleChange}
            />
            <label className="active" htmlFor="inputValue">
              Valor:
            </label>

            <div style={styles.flexRow}>
              <button className="waves-effect waves-light btn">Salvar</button>
            </div>
          </div>
        </form>
      </Modal>
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
  },

  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },

  flexStart: {
    justifyContent: "flex-start",
  },

  divRadioButtons: {},
};
