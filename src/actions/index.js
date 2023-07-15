import reduxConstants from '../constants/reduxConstants';

export const updateUploadedFile = (data) => ({
  type: reduxConstants.UPDATE_UPLOADED_FILE,
  payload: data,
});

export const updateApiLoaderStatus = (data) => ({
  type: reduxConstants.UPADTE_API_LOADER_STATUS,
  payload: data,
});

export const updateParsedText = (data) => ({
  type: reduxConstants.UPDATE_PARSED_TEXT,
  payload: data,
});

export const updateSelectedText = (data) => ({
  type: reduxConstants.UPDATE_SELECTED_TEXT,
  payload: data,
});
