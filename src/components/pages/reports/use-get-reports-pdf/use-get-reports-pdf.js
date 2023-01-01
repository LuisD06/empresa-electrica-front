import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
export const useGetReportsPdf = () => {

  const createHeaders = (keys) => {
    let headers = [];
    keys.forEach((key, i) => {
      headers.push({
        id: key,
        name: key,
        prompt: key,
        width: 28,
        align: "center",
        padding: 0
      })
    });
    return headers;
  }
  const getKeys = (reports) => {
    console.log(Object.keys(reports[0]));
    let headers = [
      'Id',
      'Cédula',
      'Correo',
      'Dirección',
      'Teléfono',
      'Medidor',
      'Coordenadas',
      '#  ',
      'Servicio',
      'Tipo',
      'Suministro',
      'Consumo',
      'Total USD',
      'Fecha'
    ]
    return headers;
  }
  const handleSubmitPdf = (reports) => {
    console.log(reports);
    const keys = getKeys(reports);
    const data = reports.map((report) => {
      return Object.values({ ...report, total: report.total.toFixed(2) + ' USD' });
    })
    console.log(data);
    const headers = createHeaders(keys);
    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });
    doc.setFontSize(1);
    autoTable(doc, {
      startY: 30,
      head: [keys],
      headStyles: {
        fontSize: 7,
        halign: 'center',
        valign: 'middle'
      },
      body: data,
      theme: "grid",
      styles: {
        fontSize: 7,
      },
      didDrawPage: (data) => {
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text(`Reporte generado en ${(new Date()).toLocaleDateString()}`, data.settings.margin.left, 22);
      }
    });
    doc.save('example.pdf');
  }
  return {
    handleSubmitPdf
  }
}