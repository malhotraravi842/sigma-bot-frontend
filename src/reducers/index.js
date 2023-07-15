import { combineReducers } from 'redux';
import ocrReducer from './ocrReducer';

export default combineReducers({
  ocr: ocrReducer,
});
