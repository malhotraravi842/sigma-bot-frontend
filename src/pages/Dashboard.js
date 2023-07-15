import { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ChatBot from '../components/ChatBot';
import DocUploader from '../components/Dashboard/DocUploader';
import { DivElement, PageContainer } from '../components/Reusable';
import PdfViewer from '../components/Dashboard/PdfViewer';
import ImageViewer from '../components/Dashboard/ImageViewer';

const Dashboard = ({ uploadedFile }) => {
  return (
    <PageContainer>
      <DivElement displayBtwCenter alignItems="initial" width="100%" height="100%" padding="0 32px">
        <DivElement width="calc(60% - 16px)" height="100%">
          {uploadedFile ? (
            <Fragment>
              {uploadedFile.type === 'application/pdf' ? <PdfViewer /> : <ImageViewer />}
            </Fragment>
          ) : (
            <DocUploader />
          )}
        </DivElement>
        <DivElement width="40%" height="100%">
          <ChatBot />
        </DivElement>
      </DivElement>
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  uploadedFile: state.ocr.uploadedFile,
});

export default compose(connect(mapStateToProps))(Dashboard);
