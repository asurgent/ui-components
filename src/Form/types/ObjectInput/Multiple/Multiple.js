import React, {
  forwardRef, useState, createRef, useImperativeHandle, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { mdiTrashCan, mdiPlus } from '@mdi/js';
import MdiIcon from '@mdi/react';
import { Button, useTheme } from '@chakra-ui/react';
import * as C from '../ObjectInput.styled';
import * as Block from '../../../../Block';
import translation from '../ObjectInput.translation';
import InputWrapper from '../InputWrapper';
import {
  clearObjectValues,
  valuesPassedValidation,
} from '../helpers';
import { dispatchEvent } from '../../../helpers';

const { t } = translation;

const propTypes = {
  options: PropTypes.instanceOf(Object),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  name: PropTypes.string.isRequired,
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    conditions: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Object),
  ]),
};

const defaultProps = {
  options: {},
  value: [],
  parseOutput: (v) => v,
  validator: {
    conditions: () => true,
    errorMessage: '',
  },
  error: null,
};

const Multiple = forwardRef((props, ref) => {
  const {
    options, name, parseOutput, validator, error,
  } = props;
  const { colors } = useTheme();

  const [value, setValue] = useState(props.value || []);
  const [newEntry, setNewEntry] = useState({});

  useEffect(() => {
    setNewEntry(clearObjectValues(options));
  }, [options]);

  useEffect(() => {
    setValue(props.value || []);
  }, [props.value]);

  const input = createRef();

  useImperativeHandle(ref, () => ({
    validationErrorMessage: validator.errorMessage,
    value: () => parseOutput(value),
    validator: () => valuesPassedValidation({ validators: validator.conditions(), value }),
  }));

  const handleChange = ({ target, index }) => {
    const newArr = value.map((ent, ind) => {
      if (ind === index) {
        const val = target.type === 'number' ? parseInt(target.value, 10) : target.value;
        return { ...ent, [target.name]: val };
      }
      return ent;
    });
    setValue(newArr);
  };

  const handleAdd = () => {
    const newValue = [...value, newEntry];
    setValue(newValue);
    setNewEntry(clearObjectValues(options));
    dispatchEvent(newValue, input);
  };

  const handleRemove = ({ index }) => {
    const newValue = value.filter((v, ind) => ind !== index);
    setValue(newValue);
    dispatchEvent(newValue, input);
  };

  return (
    <C.Container>
      <input
        style={{ display: 'none' }}
        ref={input}
        value={value}
        name={name}
        readOnly
      />

      {/* Loop over value-objects */}
      {value.map((entry, index) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <C.Entry key={index} colors={colors}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          >
            <h4>{`${t('entry', 'asurgentui')} ${index + 1}`}</h4>
            <Button
              variant="ghost"
              rightIcon={<MdiIcon path={mdiTrashCan} size={0.75} />}
              onClick={() => handleRemove({ index })}
              style={{ color: '#EF6461' }}
            >
              {t('remove', 'asurgentui')}
            </Button>
          </div>

          {/* Loop over key-value pair */}
          {Object.keys(entry).map((key) => {
            const val = entry[key];
            const option = options[key];
            const entryValidator = validator?.conditions()[key];
            return (
              <InputWrapper
                key={key}
                label={option.label}
                value={val}
                name={key}
                type={option.type}
                onChange={({ target }) => handleChange({ target, index })}
                disabled={option.disabled}
                render={option.render}
                validator={error ? entryValidator : null}
                options={option.options}
                tooltip={option.tooltip}
                placeholder={options[key].placeholder}
              />
            );
          })}
        </C.Entry>
      ))}

      <Block.Center style={{
        minHeight: '2.63rem', padding: '1rem', justifyContent: 'center',
      }}
      >
        <Button
          variant="ghost"
          rightIcon={<MdiIcon path={mdiPlus} size={0.75} />}
          onClick={handleAdd}
          style={{ color: '#133A5D' }}
        >
          {value.length === 0
            ? t('addNew', 'asurgentui')
            : t('addAnother', 'asurgentui')}
        </Button>
      </Block.Center>

    </C.Container>
  );
});

Multiple.propTypes = propTypes;
Multiple.defaultProps = defaultProps;

export default Multiple;
