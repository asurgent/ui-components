import React from 'react';
import PropTypes from 'prop-types';
import IconNoTickets from '../../../Icons/IconNoTickets';
import { Emptystate as Wrapper } from './BlockEmptyState.styled';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  children: null,
};

const Emptystate = ({ title, children }) => (
  <Wrapper>
    <IconNoTickets width="13.25rem" height="13.25rem" />
    <h4>{title}</h4>
    {children}
  </Wrapper>
);

Emptystate.propTypes = propTypes;
Emptystate.defaultProps = defaultProps;

export default Emptystate;
