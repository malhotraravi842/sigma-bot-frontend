import { Fragment, useEffect } from 'react';
import { Dashboard } from './pages';
import Navbar from './components/Navbar';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

function App() {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.js',
      import.meta.url
    ).toString();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Dashboard />
    </Fragment>
  );
}

export default App;
