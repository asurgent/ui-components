import {
  useMemo,
  useEffect,
  useContext,
} from 'react';
import { FromContext, GroupContext } from './formContext';

export const useRepeatGroup = () => {
  const {
    min,
    name,
    numberOfGroups,
  } = useContext(GroupContext);
  const { dispatch, state, initialValues } = useContext(FromContext);

  useEffect(() => {
    const group = initialValues?.[name];
    const total = group?.length > (min || 0) ? group?.length : min;
    const newGroup = Array.from(Array(total || 0), (_, i) => group[i] || ({}));

    dispatch({
      type: 'UPDATE_VALUE',
      payload: { name, value: newGroup },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min]);

  const groups = useMemo(() => {
    const group = (state.values?.[name] || []);

    return group.map((_, index) => ({
      key: `${index}-${new Date().getTime()}`,
      initialValues: state.values[name]?.[index] || {},
      initialErrors: state.errors[name]?.[index] || {},
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfGroups]);

  return groups;
};
