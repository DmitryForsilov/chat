import React, { useRef, useEffect, useContext } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices/index.js';
import NicknameContext from '../NicknameContext.js';

const renderForm = (formik, inputRef) => (
  <Form onSubmit={formik.handleSubmit}>
    <FormGroup>
      <div className="input-group">
        <FormControl
          className="mr-2"
          name="body"
          aria-label="body"
          ref={inputRef}
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />
        <Button type="submit" aria-label="submit" variant="primary" disabled={formik.isSubmitting}>Submit</Button>
        <FormControl.Feedback className="d-block" type="invalid">
          {formik.errors.networkError}
          &nbsp;
        </FormControl.Feedback>
      </div>
    </FormGroup>
  </Form>
);

const NewMessageForm = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const nickname = useContext(NicknameContext);
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }, { resetForm, setErrors }) => {
      const message = { nickname, body };

      try {
        await dispatch(actions.addMessage(currentChannelId, message));
        resetForm();
      } catch (error) {
        console.log(error);
        setErrors({ networkError: error.message });
      } finally {
        inputRef.current.select();
      }
    },
  });

  return renderForm(formik, inputRef);
};

export default NewMessageForm;
