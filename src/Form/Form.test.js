/* eslint-env jest */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  render, cleanup, act,
} from 'test-utils';

import { Button } from '@chakra-ui/react';
import * as Form from './index';

afterEach(cleanup);

const MyForm = ({ subTitle, resetTitle, onClick }) => {
  const formObj = {
    someText: {
      type: 'text', label: 'Test', placeholder: 'Hello',
    },
  };
  const formData = Form.useFormBuilder(formObj);

  useEffect(() => {
    formData.updateFields([{ name: 'someText', value: 'My value' }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Primary form={formData}>
      {(inputList, renderFields, onSubmitAction, onResetAction, isDirty) => (
        <>
          {renderFields}
          {isDirty && <Button variant="gold">{resetTitle}</Button>}
          <Button
            type="button"
            onClick={onClick()}
          >
            {subTitle}
          </Button>
        </>
      )}
    </Form.Primary>

  );
};

MyForm.propTypes = {
  subTitle: PropTypes.string.isRequired,
  resetTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

describe('Button', () => {
  test('The reset button isnt showing (isDirty) just because of a click on a field', async () => {
    const props = {
      subTitle: 'Submit', resetTitle: 'Reset', disabled: true, onClick: jest.fn(),
    };

    const rend = render(<MyForm {...props} />);
    const {
      queryByText, queryByDisplayValue, rerender,
    } = rend;

    const subBtn = queryByText(props.subTitle);
    expect(subBtn).not.toBeNull();

    // check that a button is hidden on !isDirty
    let resetBtn = queryByText(props.resetTitle);
    expect(resetBtn).toBeNull();

    const textInput = queryByDisplayValue('My value');
    expect(textInput).toBeDefined();

    act(() => textInput.click());
    rerender(<MyForm {...props} />);

    // check that a button is visible on isDirty
    resetBtn = queryByText(props.resetTitle);
    expect(resetBtn).toBeDefined();
  });
});
