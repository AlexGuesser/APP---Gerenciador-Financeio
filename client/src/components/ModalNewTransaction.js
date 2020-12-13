import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalTransaction({ onSave, onClose }) {
  const [categoryTransaction, setCategoryTransaction] = useState();
  const [descriptionTransaction, setDescriptionTransaction] = useState();
  const [valueTransaction, setValueTransaction] = useState();
  const [typeTransaction, setTypeTransaction] = useState("+");
  const [yearMonthDay, setYearMonthDay] = useState();

  const handleClose = () => {
    onClose(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const transaction = {
      category: categoryTransaction,
      description: descriptionTransaction,
      value: valueTransaction,
      type: typeTransaction,
      yearMonthDay: yearMonthDay,
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

  const handleChangeType = (event) => {
    setTypeTransaction(event.target.id);
  };

  const handleChangeData = (event) => {
    setYearMonthDay(event.target.value);
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
              id="+"
              type="radio"
              defaultChecked
              onClick={handleChangeType}
            />
            <span>Receita </span>
          </label>

          <label style={{ marginLeft: "10px" }}>
            <input
              name="group1"
              id="-"
              type="radio"
              onClick={handleChangeType}
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

          <label className="active" htmlFor="date">
            Data:
          </label>
          <input id="date" type="date" onChange={handleChangeData}></input>

          <div className="input-field">
            <input
              id="inputValue"
              type="number"
              min="0"
              step="0.01"
              autoFocus
              value={valueTransaction}
              onChange={handleChange}
            />
            <label className="active" htmlFor="inputValue">
              Valor:
            </label>

            <div style={styles.flexRow}>
              <button
                className="waves-effect waves-light btn"
                disabled={
                  !categoryTransaction ||
                  !descriptionTransaction ||
                  !valueTransaction ||
                  !yearMonthDay
                }
              >
                Salvar
              </button>
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
