import React, {
  forwardRef,
  useState,
  useCallback,
  createRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { mdiPlus, mdiFileUploadOutline } from '@mdi/js';
import MdiIcon from '@mdi/react';
import {
  Button, useTheme, Text, VStack,
} from '@chakra-ui/react';

import translation from './File.translation';
import * as C from './File.styled';
import PreviewList from './PreviewList';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.func,
};

const defaultProps = {
  value: '',
  label: '',
  props: {},
  placeholder: '',
  disabled: () => false,
  acceptedFiles: ['image/*'],
};

const File = forwardRef((props, ref) => {
  const {
    name,
  } = props;
  const input = createRef();

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

  const limitReached = inputFiles.length === 3;

  const handleFileDrop = useCallback((droppedAcceptedFiles) => {
    if (droppedAcceptedFiles.length === 0 || limitReached) { return; }

    const filesWithPreviewProp = droppedAcceptedFiles.map((file) => Object.assign(file, {
      key: `${file.name}-${Date.now()}}`,
    }));

    setInputFiles((files) => [...files, ...filesWithPreviewProp].splice(0, 3));
  }, [inputFiles]);

  const handleRemove = useCallback((e) => {
    const { value } = e.currentTarget || null;
    const numVaule = value * 1;

    if (typeof numVaule === 'number') {
      setInputFiles((prevState) => prevState.filter((v, ind) => ind !== numVaule));
    }
  }, []);
  return (
    <C.Container>

      <C.DropOuterWrapper>
        <Dropzone
          ref={input}
          onDrop={handleFileDrop}
          maxSize={4000000}
        >
          {({
            getRootProps, getInputProps, isDragActive, fileRejections,
          }) => (
            <C.DropZone
              {...getRootProps()}
              accept="image/*"
              isDragActive={isDragActive}
              isDragReject={fileRejections?.length}
              limitReached={limitReached}
              colors={colors}
            >
              <input
                {...getInputProps({
                  name,
                  disabled: limitReached,
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
        <PreviewList handleRemove={handleRemove} files={inputFiles} />
      </C.ListContainer>
      )}

    </C.Container>
  );
});

File.defaultProps = defaultProps;
File.propTypes = propTyps;

export default File;
