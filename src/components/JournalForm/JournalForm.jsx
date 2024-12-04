import styles from './JournalForm.module.css';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import Button from '../Button/Button';
import {
  FORM_ACTIONS,
  INITIAL_FORM_STATE,
  formReducer
} from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ handleSubmit, handleDelete, data }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_FORM_STATE);
  const {
    isValid: isFormValid,
    isFocused: isFormFocused,
    values: formValues,
    isFormReadyToSubmit
  } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (!data) {
      dispatchForm({
        type: FORM_ACTIONS.CLEAR_FORM
      });
    }
    dispatchForm({ type: FORM_ACTIONS.CHANGE_VALUE, payload: { ...data } });
  }, [data]);

  useEffect(() => {
    let resetTimeout;

    if (!isFormValid.title || !isFormValid.text || !isFormValid.date) {
      focusError(isFormValid);
      resetTimeout = setTimeout(() => {
        dispatchForm({
          type: FORM_ACTIONS.RESET_VALIDITY
        });
      }, 2000);
    }

    return () => {
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
    };
  }, [isFormValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      handleSubmit(formValues);
      dispatchForm({
        type: FORM_ACTIONS.CLEAR_FORM
      });
      dispatchForm({
        type: FORM_ACTIONS.CHANGE_VALUE,
        payload: { userId }
      });
    }
  }, [isFormReadyToSubmit, formValues, userId, handleSubmit]);

  useEffect(() => {
    dispatchForm({
      type: FORM_ACTIONS.CHANGE_VALUE,
      payload: {
        userId
      }
    });
  }, [userId]);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatchForm({ type: FORM_ACTIONS.SUBMIT_FORM });
  };

  const handleChange = (e) => {
    dispatchForm({
      type: FORM_ACTIONS.CHANGE_VALUE,
      payload: {
        [e.target.name]: e.target.value
      }
    });
  };

  const handleFieldsFocus = (e) => {
    const fieldName = e.target.name;
    console.log(fieldName);
    dispatchForm({ type: FORM_ACTIONS.FOCUS_FIELD, payload: { fieldName } });
  };

  const handleFieldsBlur = (e) => {
    const fieldName = e.target.name;
    dispatchForm({ type: FORM_ACTIONS.BLUR_FIELD, payload: { fieldName } });
  };

  const onDeleteItem = () => {
    handleDelete(data.id);
    dispatchForm({
      type: FORM_ACTIONS.CLEAR_FORM
    });
    dispatchForm({
      type: FORM_ACTIONS.CHANGE_VALUE,
      payload: { userId }
    });
  };

  return (
    <form className={styles['journal-form']} onSubmit={handleSubmitForm}>
      <div className={styles['journal-form__title']}>
        <label
          className={cn(
            styles['journal-form__title-field'],
            styles['title-field'],
            { [styles['focused']]: isFormFocused.title }
          )}
        >
          <Input
            name="title"
            placeholder="Заголовок..."
            appearance="title"
            value={formValues.title}
            ref={titleRef}
            isValid={isFormValid.title}
            onChange={handleChange}
            onFocus={handleFieldsFocus}
            onBlur={handleFieldsBlur}
            className={cn(styles['title-field__input'])}
          />
        </label>
        {data?.id && (
          <button
            className={styles['title-field__btn']}
            onClick={() => {
              onDeleteItem();
            }}
            type="button"
          >
            <img
              src="./delete-btn.svg"
              className={styles['title-field__icon']}
            />
          </button>
        )}
      </div>
      <div className={styles['fournal-form__fields']}>
        <label
          className={cn(styles['journal-form__field'], styles['field'], {
            [styles['focused']]: isFormFocused.date
          })}
        >
          <div className={styles['field__info']}>
            <img src="./calendar.svg" className={styles['field__icon']} />
            <span className={styles['field__label']}>Дата</span>
          </div>
          <Input
            name="date"
            type="date"
            ref={dateRef}
            value={
              formValues.date
                ? new Date(formValues.date).toISOString().slice(0, 10)
                : ''
            }
            isValid={isFormValid.date}
            onChange={handleChange}
            onFocus={handleFieldsFocus}
            onBlur={handleFieldsBlur}
            className={cn(styles['field__input'])}
          />
        </label>
        <label
          className={cn(styles['journal-form__field'], styles['field'], {
            [styles['focused']]: isFormFocused.tag
          })}
        >
          <div className={styles['field__info']}>
            <img src="./folder.svg" className={styles['field__icon']} />
            <span className={styles['field__label']}>Метки</span>
          </div>
          <Input
            name="tag"
            value={formValues.tag}
            onChange={handleChange}
            onFocus={handleFieldsFocus}
            onBlur={handleFieldsBlur}
            className={styles['field__input']}
          />
        </label>
      </div>
      <textarea
        name="text"
        ref={textRef}
        value={formValues.text}
        onChange={handleChange}
        onFocus={handleFieldsFocus}
        onBlur={handleFieldsBlur}
        className={cn(styles['journal-form__textarea'], {
          [styles['invalid']]: !isFormValid.text,
          [styles['focused']]: isFormFocused.text
        })}
      />
      <Button className={styles['journal-form__send-btn']} type="submit">
        Сохранить
      </Button>
    </form>
  );
}

export default JournalForm;
