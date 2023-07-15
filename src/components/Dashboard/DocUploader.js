import { DivElement } from '../Reusable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateApiLoaderStatus, updateUploadedFile } from '../../actions';

const DocUploader = ({ updateApiLoaderStatus, updateUploadedFile }) => {
  const fileUploadHandler = (e) => {
    updateUploadedFile(e.target.files[0]);
    updateApiLoaderStatus(true);
  };

  return (
    <DivElement height="100%" bgWhite boxShadow bRadius="6px" padding="32px" displayCenter>
      <DivElement className="doc__uploader" displayCenter>
        <label>
          <i class="fa-solid fa-cloud-arrow-up"></i>
          <input type="file" onChange={fileUploadHandler} />
        </label>
      </DivElement>
    </DivElement>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUploadedFile: (data) => dispatch(updateUploadedFile(data)),
  updateApiLoaderStatus: (data) => dispatch(updateApiLoaderStatus(data)),
});

export default compose(connect(null, mapDispatchToProps))(DocUploader);
