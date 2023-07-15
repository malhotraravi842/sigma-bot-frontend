import reduxConstants from '../constants/reduxConstants';

const initialStateSchema = {
  apiData: '',
  apiLoader: true,
  parsedText: '',
  base64EncodedData: '',
  uploadedFile: '',
  selectedText: '',
};

const ocrReducer = (state = initialStateSchema, action) => {
  let newState;

  switch (action.type) {
    case reduxConstants.UPADTE_API_LOADER_STATUS:
      newState = {
        ...state,
        apiLoader: action.payload,
      };

      return newState;

    case reduxConstants.UPDATE_UPLOADED_FILE:
      newState = {
        ...state,
        uploadedFile: action.payload,
      };

      return newState;

    case reduxConstants.UPDATE_PARSED_TEXT:
      newState = {
        ...state,
        parsedText: action.payload,
      };

      return newState;

    case reduxConstants.UPDATE_SELECTED_TEXT:
      newState = {
        ...state,
        selectedText: action.payload,
      };

      return newState;

    default:
      return state;
  }
};

export default ocrReducer;
