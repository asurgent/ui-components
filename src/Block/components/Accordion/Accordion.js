import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import {
  Tooltip, Collapse, useDisclosure, useTheme,
} from '@chakra-ui/react';
import * as C from './Accordion.styled';

import translation from './Accordion.translation';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func.isRequired,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  override: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  compact: PropTypes.bool,
  btnTooltip: PropTypes.string,
  noHorizontalBorder: PropTypes.bool,
};

const defaultProps = {
  title: null,
  description: null,
  compact: false,
  override: null,
  btnTooltip: null,
  noHorizontalBorder: false,
};

const Accordion = ({
  title, description, children, compact, override, btnTooltip, noHorizontalBorder,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { breakpoints, colors } = useTheme();

  const { t } = translation;
  return (
    <C.Wrapper
      compact={compact}
      colors={colors}
      breakpoints={breakpoints}
      noHorizontalBorder={noHorizontalBorder}
    >
      <C.Text isOpen={isOpen} hasOverride={override}>
        {!override ? (
          <>
            <C.Title>
              {title}
            </C.Title>
            <C.Description>
              {description}
            </C.Description>
          </>
        ) : override(isOpen)}
      </C.Text>
      <C.Arrow
        onClick={(e) => {
          e.stopPropagation();
          onToggle(!isOpen);
        }}
        isOpen={isOpen}
        colors={colors}
        breakpoints={breakpoints}
      >
        <Tooltip hasArrow label={btnTooltip || t('details', 'ui')}>
          <MdiIcon path={mdiChevronDown} size={0.875} />
        </Tooltip>
      </C.Arrow>
      <Collapse in={isOpen} animateOpacity style={{ gridArea: 'content' }}>
        <C.Content colors={colors}>
          { isOpen && (typeof children === 'function' ? children() : children) }
        </C.Content>
      </Collapse>
    </C.Wrapper>
  );
};

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
