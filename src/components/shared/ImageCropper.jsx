import { Button, Modal } from "@mui/material";
import React from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import Compressor from "compressorjs";
import { useDropzone } from "react-dropzone";

// file compressor
export const fileCompress = (file) => new Promise((resolve, reject) => {
  new Compressor(file, {
    quality: 0.6,
    convertTypes: ['image/webp'],
    maxWidth: 1080,
    maxHeight: 720,
    success: (result) => resolve(result),
    error: (err) => reject(err),
  })
})

const ImageCropper = ({ children, resizableImage }) => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const cropperRef = React.useRef(null);
  const [error, setError] = React.useState(null);
  const { getInputProps, getRootProps } = useDropzone({
    multiple: false,
    accept: {
      'image/png': ['.png', '.jpeg', '.webp', '.jpg']
    },
    onDrop: (acceptFiles, rejectFiles) => {
      if (rejectFiles.length > 0) {
        setError('File type not supported');
      } else {
        setImage(acceptFiles[0]);
        setIsOpen(true);
        setError('');
      }
    },
  });

  // upload cancel handler
  const cancelHandler = () => {
    setImage(null);
    setIsOpen(false);
  };

  // upload success handler
  const cropSuccessHandler = async () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const dataURL = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL("image/webp", 0.6);
      const res = await fetch(dataURL);
      const data = await res.blob();
      const compressed = await fileCompress(data);
      typeof resizableImage === "function" && resizableImage(compressed);
      setImage(null);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </div>
      {error && (
        <p className="text-left pl-3 text-red-500 font-medium text-xs mb-2">
          {error}
        </p>
      )}
      <Modal open={isOpen} className="grid place-items-center">
        <div className="bg-white rounded-lg px-3 py-5">
          <Cropper
            ref={cropperRef}
            src={image && URL.createObjectURL(image)}
            style={{
              maxWidth: "80vw",
              width: "fit-content",
              height: "fit-content",
              maxHeight: "70vh",
            }}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            responsive={true}
            background="#f2f2f2"
            shape="circle"
            // initialAspectRatio={1}
            initialAspectRatio={16 / 9}
            cropBoxResizable={false}
          />
          <div className="flex gap-x-3 justify-end mt-4">
            <Button variant="outlined" onClick={cancelHandler}>
              Cancel
            </Button>
            <Button variant="contained" onClick={cropSuccessHandler}>
              Crop
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageCropper;
