import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { TransactionModel } from "../models/TransactionModel.js";

//RETRIEVE TRANSACTION BY PERIOD
const retrieveTransactionByPeriod = async (req, res) => {
  const { period } = req.query;
  try {
    const periodIsInvalid = validatedPeriod(period);
    if (periodIsInvalid) {
      res.send(
        'É necessário informar no body o atributo"period", cujo valor deve estar no formato yyyy-mm(Ex: 2020-09) '
      );
    } else {
      const transactions = await TransactionModel.find({ yearMonth: period });
      const transactionsFound = {
        found: transactions.length,
        transactions: transactions,
      };
      res.send(transactionsFound);
    }
  } catch (error) {
    res
      .status(504)
      .send(
        "Erro ao buscar transaction do period: " + period + ".Erro: " + error
      );
  }
};

//RETRIEVE TRANSACTION BY ID
const retrieveTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await TransactionModel.findById(id).exec();
    res.send(transaction);
  } catch (error) {
    res.status(504).send("Erro ao buscar transaction." + "Erro: " + error);
  }
};

//RETRIEVE ALL TRANSACTIONS
const retrieveAllTransaction = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({});
    const transactionsFound = {
      found: transactions.length,
      transactions: transactions,
    };
    res.send(transactionsFound);
  } catch (error) {
    res
      .status(504)
      .send("Erro ao buscar todas as transactions." + "Erro: " + error);
  }
};

//CREATE TRANSACTION
const createTransaction = async (req, res) => {
  try {
    console.log(req.body);
    const newTransaction = new TransactionModel(req.body);
    const transactionSaved = await newTransaction.save();
    res.send(transactionSaved);
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .send("Erro ao criar nova Transação financeira. Error: " + error);
  }
};

//UPDATE TRANSACTION
const updateTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const newTransaction = await TransactionModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!newTransaction) {
      res.status(404).send("Documento não encontrado!");
      return;
    }
    res.send(newTransaction);
  } catch (error) {
    res.status(504).send("Erro ao realizar update. Erro: " + error);
  }
};

//DELETE BY ID
const deleteTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const transactionDeleted = await TransactionModel.findByIdAndDelete({
      _id: id,
    });
    if (!transactionDeleted) {
      res.status(404).send("Documento não encontrado!");
    } else {
      res.status(200).send("Documento deletado!");
    }
  } catch (error) {
    res.status(504).send("Erro ao deletar transação. Erro: " + error);
  }
};

//DELETE REVENUES OR EXPENSES BY YEAR-MONTH
const deleteRevenueOrExpensesByMonth = async (req, res) => {
  try {
    const { type, period } = req.body;
    const periodIsInvalid = validatedPeriod(period);
    if (periodIsInvalid) {
      res
        .status(504)
        .send(
          'É necessário informar no body o atributo"period", cujo valor deve estar no formato yyyy-mm(Ex: 2020-09) '
        );
      return;
    }
    const result = await TransactionModel.deleteMany({
      type: type,
      yearMonth: period,
    });
    console.log(result);
    if (result.n === 0) {
      res.status(404).send("Nenhum documento encontrado!");
    } else {
      res.status(200).send(result.n + " documento(s) deletado(s)!");
    }
  } catch (error) {
    res.status(504).send("Erro ao deletar transação. Erro: " + error);
  }
};

const validatedPeriod = (period) => {
  if (!period) {
    return true;
  }

  if (period.length != 7 || period.indexOf("-") != 4) {
    return true;
  }
  return false;
};

export default {
  retrieveTransactionByPeriod,
  createTransaction,
  retrieveAllTransaction,
  updateTransaction,
  retrieveTransactionById,
  deleteTransactionById,
  deleteRevenueOrExpensesByMonth,
};
