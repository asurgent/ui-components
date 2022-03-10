import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { mdiImageBrokenVariant } from '@mdi/js';
import MdiIcon from '@mdi/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import * as C from './ImagePreview.styled';

const ImagePreview = ({ imgLink, smallIconSize }) => {
  const { colors } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgValid, setImgValid] = useState(true);

  const handleError = () => setImgValid(false);

  return (
    <>
      <C.SmallImage smallIconSize={smallIconSize} colors={colors}>
        {imgValid
          ? <img role="presentation" onClick={onOpen} onError={handleError} src={imgLink} alt="small_img" />
          : <MdiIcon path={mdiImageBrokenVariant} />}
      </C.SmallImage>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <img onError={handleError} src={imgLink} alt="enlarged_img" />
        </ModalContent>
      </Modal>
    </>
  );
};

ImagePreview.propTypes = {
  imgLink: PropTypes.string,
  smallIconSize: PropTypes.string,
};
ImagePreview.defaultProps = {
  imgLink: null,
  smallIconSize: '4.375rem',
};

export default ImagePreview;
