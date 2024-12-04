export const INITIAL_FORM_STATE = {
  isValid: {
    title: true,
    date: true,
    text: true
  },
  isFocused: {
    title: false,
    date: false,
    tag: false,
    text: false
  },
  values: {
    title: '',
    text: '',
    date: '',
    tag: '',
    userId: null
  },
  isFormReadyToSubmit: false
};

export const FORM_ACTIONS = {
  RESET_VALIDITY: 'RESET_VALIDITY',
  FOCUS_FIELD: 'FOCUS_FIELD',
  BLUR_FIELD: 'BLUR_FIELD',
  CHANGE_VALUE: 'CHANGE_VALUE',
  SUBMIT_FORM: 'SUBMIT_FORM',
  CLEAR_FORM: 'CLEAR_FORM'
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.RESET_VALIDITY:
      return {
        ...state,
        isValid: INITIAL_FORM_STATE.isValid,
        isFormReadyToSubmit: false
      };

    case FORM_ACTIONS.FOCUS_FIELD: {
      if (!action.payload.fieldName) {
        return state;
      }

      return {
        ...state,
        isFocused: {
          [action.payload.fieldName]: true
        }
      };
    }

    case FORM_ACTIONS.BLUR_FIELD: {
      if (!action.payload.fieldName) {
        return state;
      }

      return {
        ...state,
        isFocused: {
          [action.payload.fieldName]: false
        }
      };
    }

    case FORM_ACTIONS.CHANGE_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload
        }
      };

    case FORM_ACTIONS.SUBMIT_FORM: {
      const titleValidity = Boolean(state.values.title?.trim().length);
      const textValidity = Boolean(state.values.text?.trim().length);
      const dateValidity = Boolean(state.values.date);

      return {
        ...state,
        isValid: {
          title: titleValidity,
          text: textValidity,
          date: dateValidity
        },
        isFormReadyToSubmit: titleValidity && textValidity && dateValidity
      };
    }

    case FORM_ACTIONS.CLEAR_FORM:
      return {
        ...state,
        values: INITIAL_FORM_STATE.values,
        isFormReadyToSubmit: false
      };
  }
};
