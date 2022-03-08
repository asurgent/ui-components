import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { useTheme, Collapse, useDisclosure } from '@chakra-ui/react';
import * as C from './Dismissable.styled';

const propTypes = {
  /**
  * ID that's stored in localstorage to keep track if dismissed or not
  */
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
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
  children: null,
  withBottomMargin: false,
};

export const DismissablePrimary = ({
  id, title, withBottomMargin, children,
}) => {
  const { colors } = useTheme();
  const { isOpen, onToggle } = useDisclosure();

  const dismissedEarlier = useMemo(() => JSON.parse(window.localStorage.getItem(id)), [id]);

  const handleDismiss = () => {
    onToggle(!isOpen);
    window.localStorage.setItem(id, true);
  };

  if (dismissedEarlier) {
    return null;
  }

  return (
    <Collapse in={!isOpen} animateOpacity>

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
  id, title, withBottomMargin, children,
}) => {
  const { colors } = useTheme();
  const { isOpen, onToggle } = useDisclosure();

  const dismissedEarlier = useMemo(() => JSON.parse(window.localStorage.getItem(id)), [id]);

  const handleDismiss = () => {
    onToggle(!isOpen);
    window.localStorage.setItem(id, true);
  };

  if (dismissedEarlier) {
    return null;
  }

  return (
    <Collapse in={!isOpen} animateOpacity>
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
