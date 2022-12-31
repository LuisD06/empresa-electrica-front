import ReactPDF from '@react-18-pdf/renderer';
import { useState } from 'react';
import { ReportPdf } from '../../../organisms/report-pdf/report-pdf';

const useGeneratePdf = () => {
  const [reportsList, setReportsList] = useState([]);
  const handleGeneratePdf = () => {
    try {
      ReactPDF.render(<ReportPdf/>, `exaple.pdf`)
    } catch (error) {
      alert(error);
    }
  }
  return {
    handleGeneratePdf
  };
}
export default useGeneratePdf;