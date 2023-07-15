import { compose } from 'redux';
import { Button, DivElement, TextWrapper } from '../Reusable';
import { Document, Page } from 'react-pdf';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Fragment, createRef, useEffect, useState } from 'react';
import { SpinLoader } from '../Loader';
import { extractTextFromDocument } from '../../lib/api';
import { updateApiLoaderStatus, updateParsedText } from '../../actions';

const Btn = styled.i`
  margin: ${(props) => (props.margin ? props.margin : '')};
  padding: 2px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 2px;
  cursor: pointer;
`;

const PdfViewer = ({
  apiLoader,
  uploadedFile,
  updateApiLoaderStatus,
  updateParsedText,
  selectedText,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [dimension, setDimension] = useState('');
  const [apiData, setApiData] = useState('');
  const [foundCoordinates, setFoundCoordinates] = useState('');
  const pdfRef = createRef();
  const canvasRef = createRef();

  useEffect(() => {
    if (uploadedFile) {
      let formData = new FormData();
      formData.append('file', uploadedFile);
      extractTextFromDocument(formData)
        .then((res) => {
          setApiData(res?.data?.data);
          let text = '';
          res?.data?.data.forEach((pages) => {
            text += pages.text + '\n';
          });
          updateParsedText(text);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          updateApiLoaderStatus(false);
        });
    }

    // eslint-disable-next-line
  }, [uploadedFile]);

  useEffect(() => {
    let coordinates = [];
    if (selectedText) {
      apiData.forEach((page) => {
        let arr = [];

        page.words.forEach((data, index) => {
          let words = selectedText.trim().split(' ');
          words.forEach((word) => {
            if (data?.word?.toLowerCase().includes(word.toLowerCase())) {
              arr.push(data);
            }
          });
        });

        coordinates.push(arr);
      });

      setFoundCoordinates(coordinates);
    } else {
      if (dimension) {
        drawRectangle('clear');
      }
    }
    // eslint-disable-next-line
  }, [selectedText]);

  useEffect(() => {
    if (dimension) {
      drawRectangle('clear');
    }
    if (foundCoordinates && foundCoordinates[pageNumber - 1].length !== 0) {
      drawRectangle('draw', foundCoordinates[pageNumber - 1]);
    }
  }, [pageNumber, foundCoordinates]);

  const drawRectangle = (type, parsedData = []) => {
    const context = canvasRef?.current?.getContext('2d');
    context.strokeStyle = 'red';
    context.lineWidth = 1;
    if (type === 'draw') {
      let pdfHeight = dimension.height;
      let pdfWidth = dimension.width;

      parsedData.forEach((pData) => {
        let xCoordinate = pData.normalizedVertices[0].x * pdfWidth;
        let yCoordinate = pData.normalizedVertices[0].y * pdfHeight;
        let width = (pData.normalizedVertices[1].x - pData.normalizedVertices[0].x) * pdfWidth;
        let height = (pData.normalizedVertices[3].y - pData.normalizedVertices[0].y) * pdfHeight;

        context.strokeRect(xCoordinate, yCoordinate, width, height);
      });
    } else {
      context.clearRect(0, 0, dimension.width, dimension.height);
    }
  };

  const pageHandler = (type) => {
    if (type === 'next' && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    } else if (type === 'prev' && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else if (type >= 1 && type <= numPages) {
      setPageNumber(type);
    }
  };

  const onDocumenLoad = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoad = () => {
    setDimension({
      height: pdfRef?.current?.offsetHeight,
      width: pdfRef?.current?.offsetWidth,
    });
  };

  return (
    <DivElement height="90%" position="relative">
      <DivElement display="flex" alignItems="center" marginBottom="8px">
        {foundCoordinates && (
          <Fragment>
            <TextWrapper primary>Found Page Matches:</TextWrapper>

            {foundCoordinates.map((page, index) => {
              return (
                page.length !== 0 && (
                  <Button
                    padding="0 16px"
                    marginLeft="8px"
                    height="32px"
                    onClick={() => pageHandler(index + 1)}
                    primaryRed>
                    {index + 1}
                  </Button>
                )
              );
            })}
          </Fragment>
        )}
      </DivElement>
      <DivElement className="pdf-header" displayCenter height="32px">
        <TextWrapper>
          Page {pageNumber} of {numPages}
        </TextWrapper>
        <Btn
          className="fa-solid fa-chevron-left"
          margin="0 8px"
          onClick={() => pageHandler('prev')}
        />
        <Btn className="fa-solid fa-chevron-right" onClick={() => pageHandler('next')} />
      </DivElement>
      <Document
        className="doc-viewer"
        file={uploadedFile}
        renderMode="canvas"
        onLoadSuccess={onDocumenLoad}>
        <Page inputRef={pdfRef} onLoadSuccess={onPageLoad} pageNumber={pageNumber} />

        {apiLoader && (
          <DivElement className="loader-overlay" displayCenter>
            <SpinLoader />
          </DivElement>
        )}

        {dimension && (
          <canvas
            ref={canvasRef}
            className="img-canvas"
            width={dimension.width}
            height={dimension.height}></canvas>
        )}
      </Document>
    </DivElement>
  );
};

const mapStateToProps = (state) => ({
  apiLoader: state.ocr.apiLoader,
  uploadedFile: state.ocr.uploadedFile,
  selectedText: state.ocr.selectedText,
});

const mapDispatchToProps = (dispatch) => ({
  updateApiLoaderStatus: (data) => dispatch(updateApiLoaderStatus(data)),
  updateParsedText: (data) => dispatch(updateParsedText(data)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(PdfViewer);
