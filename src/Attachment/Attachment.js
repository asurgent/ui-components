import React, {
  useMemo, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import {
  mdiCloudDownloadOutline, mdiEyeOutline, mdiFileImageOutline,
  mdiFileDocumentOutline, mdiFileCodeOutline, mdiFileTableOutline, mdiFileOutline,
} from '@mdi/js';
import {
  useTheme, Tooltip, Text, HStack, Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import * as C from './Attachment.styles';
import translation from './Attachment.translation';
import { formatBytes, downloadFileFromSrc } from '../utils';

const Attachment = ({ file }) => {
  const {
    attachment_url: src, name, size,
  } = file || {};
  const { colors } = useTheme();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = translation;

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
  }, [name]);

  const isImage = fileType?.typeGroup === 'IMAGE';

  const fileSizeLabel = React.useMemo(() => formatBytes(size), [size]);

  const thumbIconSize = 2;

  const handleDownload = useCallback(() => {
    downloadFileFromSrc(src, name);
  }, [src, name]);

  return (
    <>
      <C.Container colors={colors}>
        <HStack spacing={4} width="100%">

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

                  {isImage && (
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

      </C.Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <img src={src} alt="enlarged_img" />
        </ModalContent>
      </Modal>
    </>
  );
};

Attachment.propTypes = {
  file: PropTypes.shape({
    attachment_url: PropTypes.string.isRequired,
    content_type: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    updated: PropTypes.string.isRequired,
  }).isRequired,
};

export default Attachment;
