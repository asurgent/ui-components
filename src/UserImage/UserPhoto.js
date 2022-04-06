import React, { useState, useEffect, useMemo } from 'react';
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

// skip alpha variants & custom colors without nuances
const getValidBackgroundColors = ({ colors }) => Object.keys(colors).reduce((acc, cur) => {
  const col = colors[cur]['600'];

  // skip alphaColors containing rgba values
  if (col && !col.includes('rgb')) {
    return [...acc, col];
  }
  return [...acc];
}, []);

const getUserColor = ({ email, bgColors }) => {
  const firstLetter = email[0] || 'a';
  const colorIndex = (firstLetter.toLowerCase().charCodeAt(0) - 97) % bgColors.length;
  const absColorIndex = Math.abs(colorIndex); // for numbers etc
  return bgColors[absColorIndex];
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

  const bgColor = useMemo(() => {
    const bgColors = getValidBackgroundColors({ colors });
    const userColor = getUserColor({ email, bgColors });
    console.log(userColor);

    return userColor;
  }, [colors, email]);

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
      size={size}
      square={square}
      email={email}
      className={className}
      bgColor={bgColor}
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
