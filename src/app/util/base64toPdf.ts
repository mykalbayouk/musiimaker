/**
 * Takes in a base64 string and returns a file
 * @param base64 
 * @returns 
 */
export function stringToPdf(base64: string): File {
    if (!base64) {
        return new File([], 'output.pdf', { type: 'application/pdf' });
    }
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'application/pdf' });
    return new File([blob], 'output.pdf', { type: 'application/pdf' });
  }