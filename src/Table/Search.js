import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { TableContext } from './data/context';
import { QUERY_KEY } from './data/constants';
import useDelayTrigger from '../data/useDelayTrigger';
import translation from './Table.translation';

export const TableSearch = ({ placeholder }) => {
  const { t } = translation;
  const { state } = useContext(TableContext);
  const { trigger, cancel } = useDelayTrigger();

  const updateState = (query) => {
    if (state) {
      state.setKey(QUERY_KEY, query);
    }
  };

  const handleSearch = ({ target, key }) => {
    const value = target.value.replace(/\u00B4/g, '\u0022').replace(/\u2019/g, '\u0022');

    if (key === 'Enter') {
      cancel();
      updateState(value);
    } else {
      trigger(() => updateState(value));
    }
  };

  const colSpan = useBreakpointValue({ base: '3', sm: '1' });

  return (
    <GridItem width="1fr" colSpan={colSpan}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" zIndex={1}>
          <MdiIcon color="var(--chakra-colors-gray-400)" path={mdiMagnify} size={1.2} />
        </InputLeftElement>
        <Input
          borderRadius={20}
          placeholder={placeholder || `${t('search', 'ui')}...`}
          defaultValue={(state ? state.getKey(QUERY_KEY) : '')}
          onKeyUp={handleSearch}
        />
      </InputGroup>
    </GridItem>
  );
};

TableSearch.propTypes = {
  placeholder: PropTypes.string,
};
TableSearch.defaultProps = {
  placeholder: '',
};
