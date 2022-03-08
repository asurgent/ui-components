import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import * as C from '../CronEditor.styled';
import translation from '../CronEditor.translation';
import * as Block from '../../Block';

const { t } = translation;

const propTypes = {
  hook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const Duration = ({ hook }) => (
  <>
    <C.Row>
      <FormControl>
        <InputLabel id="repeat-select-label">{t('repeat', 'ui')}</InputLabel>
        <Select
          labelId="repeat-select-label"
          value={hook.getRepeatType()}
          onChange={hook.handleRepeatChange}
        >
          {
        hook.getRepeatTypesList()
          .map((type) => (
            <MenuItem key={type} value={type}>{t(type, 'ui')}</MenuItem>
          ))
      }
        </Select>
      </FormControl>

      <TextField
        disabled={!hook.customRepeat()}
        label={t('expression', 'ui')}
        value={hook.getExpression()}
        onChange={hook.handleExpressionChange}
      />

    </C.Row>

    <Block.Info style={{ maxWidth: '700px', marginTop: '1.5rem' }}>
      {t('noteUtc', 'ui')}
    </Block.Info>
  </>
);

Duration.propTypes = propTypes;
Duration.defaultProps = defaultProps;

export default Duration;
