import React, {
  forwardRef,
  useCallback,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,

} from 'react';
import PropTypes from 'prop-types';
import {
  Tag,
  TagCloseButton,
  Tooltip,
  useTheme,

} from '@chakra-ui/react';
import { mdiPlus } from '@mdi/js';
import MdiIcon from '@mdi/react';
import * as C from './Tags.styled';
import translation from './Tags.translation';
import InputWrapper from '../../components/InputWrapper';
import { dispatchEvent } from '../../helpers';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  disabled: PropTypes.func,
};

const defaultProps = {
  value: '',
  label: '',
  props: {},
  placeholder: '',
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
};

const Text = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    parseOutput,
    validator,
    disabled,
  } = props;
  const input = useRef(null);
  const [value, setValue] = useState(props.value || []);
  const [textInputValue, setTextInputValue] = useState('');

  const [currentEditTag, setCurrentEditTag] = useState('');

  const { colors } = useTheme();
  const { t } = translation;

  const addButtonRef = useRef(null);
  const tagContainerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  useEffect(() => {
    setValue(props.value || []);
  }, [props.value]);

  const handleInputChange = useCallback((e) => {
    setTextInputValue(e.target.value);
  }, []);

  const handleButtonClick = useCallback(() => {
    const { value: inputValue } = input.current;

    if (!inputValue) return;

    if (currentEditTag) {
      const nextState = value.map((tag) => (tag === currentEditTag ? inputValue : tag));

      const tagElements = Array.from(tagContainerRef.current?.children);
      const currentTag = tagElements.find((el) => el?.innerText === currentEditTag);

      currentTag.classList.remove('editing');

      setValue(nextState, dispatchEvent('', input));
      setCurrentEditTag('');
      return;
    }

    if (value.includes(inputValue)) {
      const tagElements = Array.from(tagContainerRef.current?.children);
      const currentTag = tagElements.find((el) => el?.innerText === inputValue);

      currentTag.classList.add('highlight');
      setTimeout(() => {
        currentTag.classList.remove('highlight');
      }, 200);

      setTextInputValue('');
      return;
    }
    const nextState = [...value, ...[inputValue]];
    setValue(nextState, dispatchEvent('', input));
  }, [value, currentEditTag]);

  const onKeyDown = useCallback((event) => {
    if (event.key === 'Enter' && input.current.value) {
      addButtonRef.current.classList.add('active');
    }
  }, [value]);

  const onKeyUp = useCallback((event) => {
    if (event.key === 'Enter' && input.current.value) {
      addButtonRef.current.click();
      addButtonRef.current.classList.remove('active');
    }
  }, []);

  const handleTagClick = useCallback((indexValue) => {
    const tagValue = value[indexValue];

    const tagElements = Array.from(tagContainerRef.current?.children);

    tagElements.forEach((tagElement) => tagElement.classList.remove('editing'));

    if (currentEditTag === tagValue) {
      setTextInputValue('');
      setCurrentEditTag('');
      return;
    }
    const currentTag = tagElements.find((el) => el?.innerText === tagValue);
    currentTag.classList.add('editing');

    setTextInputValue(tagValue);
    setCurrentEditTag(tagValue);
  }, [value, currentEditTag]);

  const forceTriggerOnChangeEventAfterRemove = useCallback((isInEdit) => {
    const currentInputValue = input.current.value;
    if (isInEdit && currentInputValue) {
      dispatchEvent('', input);
      setCurrentEditTag('');
    } else {
      dispatchEvent(`${currentInputValue} `, input);
      dispatchEvent(currentInputValue, input);
    }
  }, []);

  const handleRemoveTag = useCallback((e) => {
    const indexValue = e.currentTarget.value * 1;
    const isInEdit = currentEditTag === value[indexValue];

    setValue(
      (prev) => prev.filter((tag, i) => i !== indexValue),
      forceTriggerOnChangeEventAfterRemove(isInEdit),
    );
  }, [currentEditTag, value]);

  return (
    <C.Container>

      <C.InputAndButtonWrapper>
        <InputWrapper noLabel>
          <input
            {...props.props}
            type="text"
            value={textInputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            name={name}
            ref={input}
            disabled={disabled()}
            onKeyDownCapture={onKeyDown}
            onKeyUp={onKeyUp}
          />
        </InputWrapper>

        <C.AddButton
          rightIcon={currentEditTag ? null : <MdiIcon path={mdiPlus} size={0.75} />}
          ref={addButtonRef}
          color={colors?.blue?.[900]}
          onClick={handleButtonClick}
          disabled={!textInputValue}
        >
          {t(currentEditTag ? 'save' : 'add', 'ui')}
        </C.AddButton>
      </C.InputAndButtonWrapper>

      {Array.isArray(value) && value.length > 0 && (
      <C.TagsContainer ref={tagContainerRef}>
        {value?.map((tag, index) => (
          <Tag key={tag} variant="solid" colorScheme="blue" transition="background 100ms">
            <Tooltip label={t(tag === currentEditTag ? 'ignore' : 'edit', 'ui')}>
              <C.TagLabel value={index} onClick={() => handleTagClick(index)}>
                {tag}
              </C.TagLabel>
            </Tooltip>
            <TagCloseButton value={index} onClick={handleRemoveTag} />
          </Tag>
        ))}
      </C.TagsContainer>
      )}
    </C.Container>
  );
});

Text.defaultProps = defaultProps;
Text.propTypes = propTyps;

export default Text;
