/**
 * @author thucvv
 */

import { combineReducers } from "redux";
import ManagerUserReducer from "./ManagerUserReducer";
import CorrelationReducer from "./CorrelationReducer";
import RevenueReducer from "./RevenueReducer";
import TransactionReducer from "./TransactionReducer";
import CurrencyReducer from "./CurrencyReducer";
import LoginReducer from "./LoginReducer";
import ProductReducer from "./ProductReducer";
import ImportFileReducer from "./ImportFileReducer";

import MessageErrorReducer from "./MessageErrorReducer";
import BonusReducer from "./BonusReducer";
import LoadingReducer from "./LoadingReducer";
import ClassReducer from "./ClassReducer";
import TeacherReducer from "./TeacherReducer";
import ReviewReducer from "./ReviewReducer";

const rootReducer = combineReducers({
  LoginReducer,
  ManagerUserReducer,
  CorrelationReducer,
  RevenueReducer,
  TransactionReducer,
  CurrencyReducer,
  ProductReducer,
  ImportFileReducer,
  MessageErrorReducer,
  BonusReducer,
  LoadingReducer,
  ClassReducer,
  TeacherReducer,
  ReviewReducer
});

export default rootReducer;
