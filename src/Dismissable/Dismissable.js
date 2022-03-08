import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { useTheme, Collapse } from '@chakra-ui/react';
import * as C from './Dismissable.styled';

const propTypes = {
  /**
  * ID that's stored in localstorage to keep track if dismissed or not
  */
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  /**
  * Fade out speed in milliseconds
  */
  fadeOutSpeed: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  /**
  * How large should the button be?
  */
  withBottomMargin: PropTypes.bool,
};

const defaultProps = {
  fadeOutSpeed: 0,
  children: null,
  withBottomMargin: false,
};

export const DismissablePrimary = ({
  id, title, fadeOutSpeed, withBottomMargin, children,
}) => {
  const { colors } = useTheme();

  const [isDismissed, setDismissed] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const dismissedEarlier = JSON.parse(window.localStorage.getItem(id));
    setDismissed(dismissedEarlier || false);
  }, [id]);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => {
      setDismissed(true);
      window.localStorage.setItem(id, true);
    }, fadeOutSpeed);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <Collapse in={!fadeOut} animateOpacity>

      <C.ContainerPrimary withBottomMargin={withBottomMargin} colors={colors}>
        <C.Header>
          <h3>{title}</h3>
          <C.Dismiss onClick={() => handleDismiss()}>
            <MdiIcon
              path={mdiClose}
              size={0.75}
            />
          </C.Dismiss>
        </C.Header>
        {children}
      </C.ContainerPrimary>

    </Collapse>
  );
};

DismissablePrimary.propTypes = propTypes;
DismissablePrimary.defaultProps = defaultProps;

export const DismissablePlain = ({
  id, title, fadeOutSpeed, withBottomMargin, children,
}) => {
  const { colors } = useTheme();

  const [isDismissed, setDismissed] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const dismissedEarlier = JSON.parse(window.localStorage.getItem(id));
    setDismissed(dismissedEarlier || false);
  }, [id]);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => {
      setDismissed(true);
      window.localStorage.setItem(id, true);
    }, fadeOutSpeed);
  };

  console.log('isDismissed', isDismissed);
  if (isDismissed) {
    return null;
  }

  return (
    <Collapse in={!fadeOut} animateOpacity>
      <C.ContainerPlain withBottomMargin={withBottomMargin} colors={colors}>
        <C.Header>
          <h3>{title}</h3>
          <C.Dismiss onClick={() => handleDismiss()}>
            <MdiIcon
              path={mdiClose}
              size={0.75}
            />
          </C.Dismiss>
        </C.Header>
        {children}
      </C.ContainerPlain>
    </Collapse>
  );
};

DismissablePlain.propTypes = propTypes;
DismissablePlain.defaultProps = defaultProps;
