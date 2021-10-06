export const formReducer = (state, msg) => {
  switch (msg.type) {
    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [msg.payload.name]: msg.payload.value },
      };
    case 'CLEAR_FIELD_ERROR': {
      const { [msg.payload.name]: _, ...rest } = state.errors;
      return {
        ...state,
        errors: { ...rest },
      };
    } case 'RESET_FORM':
      return { ...state, ...msg.payload, resetCount: state.resetCount + 1 };
    case 'UPDATE_VALUE':
      return { ...state, values: { ...state.values, [msg.payload.name]: msg.payload.value } };
    case 'SET_SUBMIT':
      return { ...state, isSubmitting: msg.payload };
    case 'SET_SUBMIT_COUNT':
      return { ...state, submitCount: msg.payload };
    default:
      return { ...state };
  }
};
