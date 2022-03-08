import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/react';
import { Wrapper, Picture } from './UserPhoto.styled';

const GetUserInitials = (fullName) => {
  const match = (/^(\w).*\b(\w).*?|^(\w{2}).*?$/g).exec(`${fullName}`);
  if (match) {
    const [, fist, second, single] = match;

    if (single) {
      return single;
    }
    return `${fist}${second}`;
  }

  return '';
};

const propTypes = {
  size: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  square: PropTypes.bool,
  href: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  size: '1.5rem',
  name: '',
  email: '',
  square: false,
  href: '',
  className: '',
};

const UserPhoto = (props) => {
  const {
    size,
    name,
    email,
    square,
    href,
    className,
  } = props;
  const [url, setUrl] = useState('');
  const [imageExists, setImageExists] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setUrl(href);
  }, [href]);

  const onLoad = () => {
    setImageExists(true);
  };

  const onError = () => {
    setImageExists(false);
  };

  return (
    <Wrapper
      colors={colors}
      size={size}
      square={square}
      email={email}
      className={className}
    >
      <Picture
        alt="user-photo"
        imageExists={imageExists}
        onError={onError}
        onLoad={onLoad}
        src={url}
      />
      {imageExists === false && (
        <small>{GetUserInitials(name)}</small>
      )}
    </Wrapper>
  );
};

UserPhoto.propTypes = propTypes;
UserPhoto.defaultProps = defaultProps;

export default UserPhoto;
