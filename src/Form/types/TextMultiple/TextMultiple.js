import React, {
  useState, forwardRef, createRef, useEffect, useImperativeHandle, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { mdiTrashCan, mdiPlus } from '@mdi/js';
import MdiIcon from '@mdi/react';
import { IconButton, Button, useTheme } from '@chakra-ui/react';
import * as C from './TextMultiple.styled';
import { dispatchEvent } from '../../helpers';
import * as Block from '../../../Block';
import translation from './TextMultiple.translation';

const { t } = translation;

const propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
};

const defaultProps = {
  value: [],
  placeholder: '',
  parseOutput: (v) => v.filter((entry) => entry !== ''),
  validator: {
    condition: () => true,
    errorMessage: '',
  },
};

const TextMultiple = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    parseOutput,
    validator,
  } = props;
  const { colors } = useTheme();

  const [value, setValue] = useState(props.value || []);

  const canAddNew = useMemo(() => !value.some((v) => v === ''), [value]);

  useEffect(() => {
    setValue(props.value || []);
  }, [props.value]);

  const input = createRef();

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
  }));

  const handleRemove = ({ index }) => {
    const newArr = value.filter((el, ind) => ind !== index);
    setValue(newArr);
    dispatchEvent(newArr, input);
  };

  const handleChange = ({ target, index }) => {
    const newArr = value.map((ent, ind) => (ind === index ? target.value : ent));
    setValue(newArr);
  };

  const addNew = () => setValue([...value, '']);

  return (
    <>
      <C.Container>
        <C.HiddenInput
          ref={input}
          value={value}
          name={name}
          readOnly
        />
        {value.map((entry, index) => (
        /* eslint-disable-next-line react/no-array-index-key */
          <C.Entry key={index} colors={colors}>
            <input
              type="text"
              placeholder={placeholder}
              value={entry}
              onChange={({ target }) => handleChange({ target, index })}
            />
            <IconButton
              variant="unstyled"
              style={{ color: '#EF6461' }}
              icon={<MdiIcon path={mdiTrashCan} size={0.75} />}
              onClick={() => handleRemove({ index })}
            >
              {t('remove', 'ui')}
            </IconButton>
          </C.Entry>
        ))}

        <Block.Center style={{
          minHeight: '2.63rem', padding: '1rem', justifyContent: 'center',
        }}
        >
          <Button
            variant="unstyled"
            style={{ color: '#133A5D' }}
            disabled={!canAddNew}
            onClick={addNew}
            rightIcon={<MdiIcon path={mdiPlus} size={0.75} />}
          >
            {value.length === 0
              ? t('addNew', 'ui')
              : t('addAnother', 'ui')}
          </Button>
        </Block.Center>
      </C.Container>

    </>
  );
});

TextMultiple.propTypes = propTypes;
TextMultiple.defaultProps = defaultProps;

export default TextMultiple;
