import { Document, Page, Text, View } from '@react-18-pdf/renderer'

export const ReportPdf = () => {
  return (
    <Document>
      <Page size='A4'>
        <View>
          <Text>Reporte 11-2022</Text>
        </View>
      </Page>
    </Document>
  )
}