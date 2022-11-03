const downloadFileFromSrc = async (src, filename) => {
  try {
    const result = await fetch(src);

    const blob = await result.blob();
    const href = await URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.log(error);
  }
};

export default downloadFileFromSrc;
