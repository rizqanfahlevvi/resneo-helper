import type jsPDF from 'jspdf';
import { SessionRecord, PatientIdentity } from '../store';

const MARGIN = 14;
const PAGE_WIDTH = 210; // A4 mm

function addHeader(doc: jsPDF, title: string): number {
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 0, PAGE_WIDTH, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('ResNeo Helper', MARGIN, 11);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(title, MARGIN, 18);
  doc.setTextColor(0, 0, 0);
  return 32;
}

function addSectionTitle(doc: jsPDF, text: string, y: number): number {
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(79, 70, 229);
  doc.text(text.toUpperCase(), MARGIN, y);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  return y + 6;
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > 280) {
    doc.addPage();
    return 16;
  }
  return y;
}

export interface PdfExportData {
  session: SessionRecord;
  patientIdentity?: Partial<PatientIdentity>;
  gestationalAge?: string;
}

export async function exportSessionPdf({ session, patientIdentity, gestationalAge }: PdfExportData): Promise<void> {
  const { default: JsPDF } = await import('jspdf');
  const doc = new JsPDF({ unit: 'mm', format: 'a4' });
  let y = addHeader(doc, 'Ringkasan Resusitasi Neonatus');

  doc.setFontSize(9);
  doc.text(`Tanggal Sesi: ${session.date}`, MARGIN, y);
  y += 6;
  doc.text(`Durasi: ${session.duration}`, MARGIN, y);
  y += 8;

  // Identitas pasien
  y = addSectionTitle(doc, 'Identitas Pasien', y);
  doc.setFontSize(9);
  const identityLines = [
    patientIdentity?.namaIbu ? `Nama Ibu: ${patientIdentity.namaIbu}` : null,
    gestationalAge ? `Usia Gestasi: ${gestationalAge} minggu` : null,
    session.birthWeight ? `Berat Lahir: ${session.birthWeight} g` : null,
    session.anthropometry?.pb ? `Panjang Badan: ${session.anthropometry.pb} cm` : null,
    session.anthropometry?.lk ? `Lingkar Kepala: ${session.anthropometry.lk} cm` : null,
    patientIdentity?.jenisKelamin ? `Jenis Kelamin: ${patientIdentity.jenisKelamin}` : null,
    patientIdentity?.diagnosisIbu ? `Diagnosis Ibu: ${patientIdentity.diagnosisIbu}` : null,
  ].filter(Boolean) as string[];
  if (identityLines.length === 0) identityLines.push('Tidak ada data identitas tercatat');
  identityLines.forEach((line) => {
    y = ensureSpace(doc, y, 6);
    doc.text(`- ${line}`, MARGIN, y);
    y += 6;
  });
  y += 4;

  // Obat diberikan
  y = ensureSpace(doc, y, 12);
  y = addSectionTitle(doc, 'Obat Diberikan', y);
  doc.setFontSize(9);
  if (!session.drugLog || session.drugLog.length === 0) {
    doc.text('- Tidak ada obat yang tercatat', MARGIN, y);
    y += 6;
  } else {
    session.drugLog.forEach((d) => {
      y = ensureSpace(doc, y, 6);
      doc.text(`- ${d.time} ${d.drugName} ${d.dose} via ${d.route}`, MARGIN, y);
      y += 6;
    });
  }
  y += 4;

  // Log tindakan
  y = ensureSpace(doc, y, 12);
  y = addSectionTitle(doc, 'Log Tindakan', y);
  doc.setFontSize(8.5);
  if (session.log.length === 0) {
    doc.text('- Tidak ada log tindakan', MARGIN, y);
    y += 6;
  } else {
    session.log.forEach((entry) => {
      y = ensureSpace(doc, y, 6);
      const wrapped = doc.splitTextToSize(`${entry.time} ${entry.message}`, PAGE_WIDTH - MARGIN * 2);
      doc.text(wrapped, MARGIN, y);
      y += 5 * wrapped.length + 1;
    });
  }

  y = ensureSpace(doc, y, 14);
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Dihasilkan otomatis oleh ResNeo Helper — bagian dari MD Kit. Bukan pengganti rekam medis resmi.', MARGIN, 290);

  const fileDate = session.date.replace(/[,\s:]/g, '-');
  doc.save(`ResNeo-Ringkasan-${fileDate}.pdf`);
}
