import { compose } from 'redux';
import { createRef, useEffect, useState } from 'react';
import { DivElement, ImgElement } from '../Reusable';
import { connect } from 'react-redux';
import { updateApiLoaderStatus, updateParsedText } from '../../actions';
import { SpinLoader } from '../Loader';
import { getBase64, resizeBase64Image } from '../../utils';
import { extractTextFromImage } from '../../lib/api';

const ImageViewer = ({
  apiLoader,
  updateApiLoaderStatus,
  uploadedFile,
  updateParsedText,
  selectedText,
}) => {
  const [dimension, setDimension] = useState('');
  const [base64EncodedData, setBase64EncodedData] = useState('');
  const [resizedBase64Data, setResizedBase64Data] = useState('');
  const [apiData, setApiData] = useState('');
  const imgRef = createRef();
  const canvasRef = createRef();

  useEffect(() => {
    if (uploadedFile) {
      getBase64(uploadedFile)
        .then((base64) => {
          setBase64EncodedData(base64);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (base64EncodedData && dimension) {
      resizeBase64Image(base64EncodedData, dimension.width, dimension.height)
        .then((base64) => {
          setResizedBase64Data(base64);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [base64EncodedData, dimension]);

  useEffect(() => {
    if (resizedBase64Data) {
      extractTextFromImage({ base64Url: resizedBase64Data })
        .then((res) => {
          setApiData(res?.data?.data);
          updateParsedText(res?.data?.data[0]?.description);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          updateApiLoaderStatus(false);
        });
    }

    // eslint-disable-next-line
  }, [resizedBase64Data]);

  useEffect(() => {
    let arr = [];
    if (selectedText) {
      apiData.forEach((data, index) => {
        let words = selectedText.trim().split(' ');
        words.forEach((word) => {
          let text = data.description.trim().toLowerCase();
          if (text.includes(word) && index !== 0) {
            arr.push(data);
          }
        });
      });

      if (arr && arr.length !== 0) {
        drawRectangle('draw', arr);
      }
    } else {
      if (dimension && resizedBase64Data) {
        drawRectangle('clear');
      }
    }
    // eslint-disable-next-line
  }, [selectedText]);

  const drawRectangle = (type, parsedData = []) => {
    const context = canvasRef?.current?.getContext('2d');
    context.strokeStyle = 'red';
    context.lineWidth = 1;
    if (type === 'draw') {
      parsedData.forEach((pData) => {
        let data = pData?.boundingPoly?.vertices;
        let xCoordinate = data[0].x;
        let yCoordinate = data[0].y;
        let width = data[1].x - data[0].x;
        let height = data[3].y - data[0].y;

        context.strokeRect(xCoordinate, yCoordinate, width, height);
      });
    } else {
      context.clearRect(0, 0, dimension.width, dimension.height);
    }
  };

  const onImageLoad = () => {
    setDimension({
      height: imgRef?.current?.offsetHeight,
      width: imgRef?.current?.offsetWidth,
    });
  };

  return (
    <DivElement
      padding="32px"
      bgWhite
      bRadius="6px"
      displayCenter
      minHeight="100%"
      position="relative">
      <DivElement position="relative">
        {dimension && resizedBase64Data && (
          <canvas
            ref={canvasRef}
            width={dimension.width}
            height={dimension.height}
            className="img-canvas"
            style={{
              background: `url("${resizedBase64Data}")`,
              backgroundSize: 'cover',
            }}
          />
        )}

        {base64EncodedData && (
          <ImgElement
            id="imageViewer"
            src={base64EncodedData}
            alt="document"
            width="100%"
            height="auto"
            ref={imgRef}
            visibility="hidden"
            onLoad={onImageLoad}
          />
        )}
      </DivElement>

      {apiLoader && (
        <DivElement className="loader-overlay" displayCenter>
          <SpinLoader />
        </DivElement>
      )}
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(ImageViewer);
