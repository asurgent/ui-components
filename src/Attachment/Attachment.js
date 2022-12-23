import React, {
  useState,
  useMemo, useCallback, useEffect,

} from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import {
  mdiCloudDownloadOutline, mdiEyeOutline, mdiFileImageOutline,
  mdiFileDocumentOutline, mdiFileCodeOutline, mdiFileTableOutline, mdiFileOutline,
} from '@mdi/js';
import {
  useTheme, Tooltip, Text, HStack, Flex, VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import * as C from './Attachment.styles';
import translation from './Attachment.translation';
import { formatBytes, downloadFileFromSrc } from '../utils';

const propTypes = {
  file: PropTypes.instanceOf(Object).isRequired,
  modalPreview: PropTypes.bool,
};

const defaultProps = {
  modalPreview: false,
};

const Attachment = ({ file, modalPreview }) => {
  const { t } = translation;
  const { colors } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fileState, setFileState] = useState(
    { src: file.attachment_url, name: file.name, size: file.size },
  );

  useEffect(() => {
    if (!file.attachment_url) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setFileState({ src: reader.result, name: file.name, size: file.size });
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const {
    src, name, size,
  } = fileState || {};

  const fileType = useMemo(() => {
    if (!src) return null;

    let icon = mdiFileOutline;
    let typeGroup = 'other';
    let extension = '';

    const fileHasExtension = name.includes('.');
    const poppedExtension = fileHasExtension && name.split('.').pop();

    if (fileHasExtension && poppedExtension && poppedExtension.length < 5) {
      extension = poppedExtension;

      if (['pdf', 'docx', 'doc'].includes(extension)) {
        icon = mdiFileDocumentOutline;
        typeGroup = 'DOCUMENT';
      } else if (['xlsx', 'xlsm', 'csv'].includes(extension)) {
        icon = mdiFileTableOutline;
        typeGroup = 'SPREADSHEAT';
      } else if (['jpg', 'png', 'gif', 'heic'].includes(extension)) {
        icon = mdiFileImageOutline;
        typeGroup = 'IMAGE';
      } else if (['json', 'xml', 'yml'].includes(extension)) {
        icon = mdiFileCodeOutline;
        typeGroup = 'CODE';
      }
    }

    return {
      icon,
      typeGroup,
      extension,
    };
  }, [src, name]);

  const isImage = fileType?.typeGroup === 'IMAGE';

  const fileSizeLabel = React.useMemo(() => formatBytes(size), [size]);

  const thumbIconSize = 2;

  const handleDownload = useCallback(() => {
    downloadFileFromSrc(src, name);
  }, [src, name]);

  return (
    <>
      <C.Container colors={colors}>

        <VStack width="100%">

          <HStack spacing={2} width="100%">

            <div style={{ position: 'relative' }}>

              <MdiIcon
                style={{ position: 'relative', zIndex: 5 }}
                className="thumb-icon"
                path={fileType?.icon}
                size={thumbIconSize}
                color={colors?.blue?.['900']}
              />
              { fileType?.extension && (
              <C.FileExtensionWrapper colors={colors}>
                <div className="stripe">
                  <span>{fileType?.extension}</span>
                </div>
              </C.FileExtensionWrapper>
              )}
            </div>

            <Flex flexDirection="column" width="100%">
              <Text margin={0} fontSize={14}>{name}</Text>

              <Flex height="100%" width="100%" justifyContent="space-between" alignItems="center">
                <Text margin={0} color={colors?.gray?.['600']} fontSize={14}>{fileSizeLabel}</Text>
                <Flex alignItems="center" justifyContent="center">

                  <HStack spacing={2}>

                    {isImage && modalPreview && (
                    <Tooltip label={t('preview', 'ui')}>
                      <MdiIcon className="action-icon" path={mdiEyeOutline} size={1} onClick={onOpen} />
                    </Tooltip>
                    )}
                    <Tooltip label={t('download', 'ui')}>
                      <MdiIcon className="action-icon" path={mdiCloudDownloadOutline} size={1} onClick={handleDownload} />
                    </Tooltip>
                  </HStack>

                </Flex>
              </Flex>

            </Flex>
          </HStack>

          {!modalPreview && isImage && <img src={src} alt="enlarged_img" />}

        </VStack>

      </C.Container>

      {modalPreview && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <img src={src} alt="enlarged_img" />
        </ModalContent>
      </Modal>
      ) }

    </>
  );
};

Attachment.propTypes = propTypes;
Attachment.defaultProps = defaultProps;

export default Attachment;
