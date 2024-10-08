
const convertFileToBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const addUploadCapabilities = (dataProvider: any) => ({
  ...dataProvider,
  update: (resource: any, params: any) => {
    if (resource !== 'posts' || !params.data.pictures) {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }
    // The posts edition form uses a file upload widget for the pictures field.
    // Freshly dropped pictures are File objects
    // and must be converted to base64 strings
    const newPictures = params.data.pictures.filter(
      (p: any) => p.rawFile instanceof File
    );
    const formerPictures = params.data.pictures.filter(
      (p: any) => !(p.rawFile instanceof File)
    );

    return Promise.all(newPictures.map(convertFileToBase64))
      .then(base64Pictures =>
        base64Pictures.map(picture64 => ({
          src: picture64,
          title: `${params.data.title}`,
        }))
      )
      .then(transformedNewPictures =>
        dataProvider.update(resource, {
          ...params,
          data: {
            ...params.data,
            pictures: [
              ...transformedNewPictures,
              ...formerPictures,
            ],
          },
        })
      );
  },
});