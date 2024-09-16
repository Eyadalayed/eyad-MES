import QRCode from 'qrcode';

export async function generateQRCode(data: string): Promise<string> {
  try {
    const url = await QRCode.toDataURL(data);
    return url;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}