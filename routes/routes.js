import express from "express";
import service from "../services/TransactionService.js";

const transactionRouter = express();
const rootPath = "/api/transaction";

transactionRouter.get(rootPath + "/:id", service.retrieveTransactionById);
transactionRouter.get(rootPath, service.retrieveTransactionByPeriod);
transactionRouter.get("/api/transaction-all", service.retrieveAllTransaction);
transactionRouter.post(rootPath, service.createTransaction);
transactionRouter.put(rootPath + "/:id", service.updateTransaction);
transactionRouter.delete(rootPath + "/:id", service.deleteTransactionById);
transactionRouter.delete(rootPath, service.deleteRevenueOrExpensesByMonth);

export { transactionRouter as router };
