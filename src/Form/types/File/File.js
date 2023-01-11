import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { mdiPlus, mdiFileUploadOutline } from '@mdi/js';
import MdiIcon from '@mdi/react';
import {
  Button, useToast, useTheme, Text, VStack,
} from '@chakra-ui/react';
import { dispatchEvent } from '../../helpers';

import translation from './File.translation';
import * as C from './File.styled';
import PreviewList from './PreviewList';

const limit = 5;

const imageFileExtensionsSwitch = {
  'image/jpeg': () => '.jpg',
  'image/png': () => '.png',
  'image/gif': () => '.gif',
  default: () => '',
};

function getImageFileExtension(fileType) {
  const result = imageFileExtensionsSwitch[fileType] || imageFileExtensionsSwitch.default;
  return result();
}

const propTyps = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  props: PropTypes.instanceOf(Object),
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.func,
};

const defaultProps = {
  value: '',
  props: {},
  disabled: () => false,
  acceptedFiles: ['image/*'],
};

const File = forwardRef((props, ref) => {
  const {
    name,
  } = props;
  const input = useRef();

  const toast = useToast();

  const [inputFiles, setInputFiles] = useState(props.value || []);
  const { t } = translation;

  const fileDropErrors = {
    'file-too-large': t('fileToLarge', 'ui'),
  };

  const { colors } = useTheme();

  useImperativeHandle(ref, () => ({
    value: () => inputFiles,
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  useEffect(() => {
    setInputFiles(props.value || '');
  }, [props.value]);

  const limitReached = inputFiles.length === limit;

  const handleFileDrop = useCallback((droppedAcceptedFiles, isPastedFromClipBoard = false) => {
    if (droppedAcceptedFiles.length === 0 || limitReached) { return; }

    const filesWithPreviewProp = droppedAcceptedFiles.map((file) => Object.assign(file, {
      key: `${file.name}-${Date.now()}}`,
    }));

    setInputFiles((files) => [...files, ...filesWithPreviewProp].splice(0, limit));
    if (isPastedFromClipBoard) {
      toast({
        description: t('pastedFromClipboard', 'ui'),
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [inputFiles]);

  const handleRemove = useCallback((e) => {
    const { value } = e.currentTarget || null;
    const numVaule = value * 1;

    if (typeof numVaule === 'number') {
      setInputFiles((prevState) => prevState.filter((v, ind) => ind !== numVaule));
    }
  }, []);

  const handleAddClick = useCallback(() => {
    if (input.current) {
      input.current.click();
    }
  }, [input]);

  const hiddenInputRef = React.useRef(null);
  useEffect(() => {
    /*
    file drop on drop-zone is not triggering the onChange so we need
    to trigger it by manually dispatch an event to a hidden input
    */
    const value = inputFiles.length ? JSON.stringify(inputFiles) : '';
    dispatchEvent(value, hiddenInputRef);
  }, [inputFiles]);

  useEffect(() => {
    /*
      Different browsers handles ClipBoard API in different ways
      Chrome + Safari doesn't have accesss to the file name from the pasted file in clipboard.

      In Firefox, all files end up as type "image/png" and
      if it's not a image the file size will be 0
    */

    function getFileFromPasteEvent(event) {
      const { items } = event.clipboardData || event.originalEvent.clipboardData;

      const pastedFile = Object.values(items).find((item) => item.kind === 'file')?.getAsFile();

      let file;
      if (pastedFile) {
        const fileName = (event.clipboardData || window.clipboardData).getData('text') || 'image';

        const blob = new Blob([pastedFile], { type: pastedFile.type });

        if (blob.size && blob.type?.includes('image')) {
          const extension = !['jpg', 'jpeg', 'gif', 'png'].includes(fileName.split('.').pop()) ? getImageFileExtension(blob.type) : '';
          blob.name = `${fileName}${extension}`;
          file = blob;
        }
      }

      return file;
    }

    const handlePasteAnywhere = (event) => {
      const file = getFileFromPasteEvent(event);

      if (file) {
        handleFileDrop([file], true);
      }
    };

    window.addEventListener('paste', handlePasteAnywhere);

    return () => {
      window.removeEventListener('paste', handlePasteAnywhere);
    };
  }, []);

  return (
    <C.Container>

      <C.DropOuterWrapper>

        <input
          style={{ display: 'none' }}
          type="text"
          ref={hiddenInputRef}
        />
        <Dropzone
          onDrop={handleFileDrop}
          maxSize={4000000}

        >
          {({
            getRootProps, getInputProps, isDragActive, fileRejections,
          }) => (
            <C.DropZone
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={fileRejections?.length}
              limitReached={limitReached}
              colors={colors}
            >

              <input
                {...getInputProps({
                  name,
                  disabled: limitReached,
                  ref: input,
                })}
              />
              <VStack spacing={5} align="center">

                { !limitReached && (
                <>

                  <MdiIcon color={colors?.blue?.[900]} path={mdiFileUploadOutline} size={3} />
                  <Button
                    rightIcon={<MdiIcon path={mdiPlus} size={0.75} />}
                    style={{ color: colors?.blue?.[900] }}
                    display="flex"
                    onClick={handleAddClick}
                  >
                    {t('addButton', 'ui')}
                  </Button>
                </>
                )}
                <Text>
                  {limitReached ? t('limitReached', 'ui') : t('dropZonePlaceholder', 'ui') }
                </Text>

                {fileRejections
                  ?.map(({ errors }) => errors.map(({ message, code }) => <Text fontWeight={500} color={colors?.red?.['600']}>{fileDropErrors[code] || message}</Text>))}

              </VStack>
            </C.DropZone>
          )}
        </Dropzone>
      </C.DropOuterWrapper>

      {inputFiles?.length > 0 && (
      <C.ListContainer
        colors={colors}
      >
        <Text marginLeft="1rem" marginBottom="0" textTransform="capitalize" fontWeight="bold" fontSize="sm">{t('uploadedTitle', 'ui')}</Text>
        <PreviewList handleRemove={handleRemove} files={inputFiles} />
      </C.ListContainer>
      )}

    </C.Container>
  );
});

File.defaultProps = defaultProps;
File.propTypes = propTyps;

export default File;
