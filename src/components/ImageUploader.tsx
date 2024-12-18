import { Box, Stack } from '@mui/system'
import React, { forwardRef, useEffect, useState } from 'react'
import Resizer from 'react-image-file-resizer'
import Dropzone from './Dropzone'
import ApiController from '../api'

const MAX_FILE_SIZE = 3200000 // 3mb
const COMPRESSION_FILE_SIZE_THRESHOLD = 50000
const IMAGE_MAX_WIDTH = 280
const IMAGE_MAX_HEIGHT = 800
const IMAGE_MIN_WIDTH = 200
const IMAGE_MIN_HEIGHT = 200
const IMAGE_QUALITY = 80

// export interface IUploadImage {
//   signedUrl: string;
//   file: File;
//   remove: () => any;
// }

export interface ILessonImageUploaderProps {
  previewUrlCallback: (previewUrl: string) => any
  downloadUrlCallback: (url: string, upload: () => Promise<void>) => any
  dialogOpen?: {
    open: boolean
    closeCallback: () => any
  }
  children?: React.ReactNode
}

const getDownloadUrl = (signedUrl: string) => signedUrl?.split('?')[0]

const dataURItoFile = (dataURI: string) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new File([ab], 'image.png', { type: mimeString })
}

const ImageUploader = forwardRef((props: ILessonImageUploaderProps, ref) => {
  const [file, setFile] = useState<File | undefined>()
  const [isDragActive, setIsDragActive] = React.useState(false)

  const resizeFile = (file: File) => {
    Resizer.imageFileResizer(
      file,
      IMAGE_MAX_WIDTH,
      IMAGE_MAX_HEIGHT,
      'PNG',
      IMAGE_QUALITY,
      0,
      (uri) => setFile(dataURItoFile(uri.toString())),
      'base64',
      IMAGE_MIN_WIDTH,
      IMAGE_MIN_HEIGHT
    )
  }

  const setResizedFile = (file: File) => {
    if (
      file.size > COMPRESSION_FILE_SIZE_THRESHOLD &&
      !['image/gif', 'image/svg+xml'].includes(file.type)
    ) {
      // if it's bigger than 100kb
      resizeFile(file)
    } else {
      setFile(file)
    }
  }

  // const upload = (signedUrl: string) =>
  //   ApiController.uploadToS3(signedUrl, file);

  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   props.previewUrlCallback(URL.createObjectURL(file));
  //   ApiController.getS3ImageUploadParams(
  //     file!.name.split(".")[file!.name.split(".").length - 1],
  //     file!.type
  //   ).then(({ signedUrl }) =>
  //     props.downloadUrlCallback(getDownloadUrl(signedUrl), () =>
  //       upload(signedUrl)
  //     )
  //   );
  // }, [file]);

  return (
    <Stack
      flex={1}
      sx={{
        cursor: 'pointer',
        opacity: isDragActive ? 0.5 : 1,
        transition: '0.2s',
        willChange: 'opacity',
      }}
    >
      <Dropzone
        onDragStateChange={setIsDragActive}
        onFileDrop={setResizedFile}
        //clickDisabled={props.clickDisabled}
        ref={ref}
      >
        {props.children}
      </Dropzone>
    </Stack>
  )
})

ImageUploader.displayName = 'ImageUploader'

export default ImageUploader
