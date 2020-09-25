import React, { useRef, useEffect, useContext } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';

import * as actions from '../actions/index.js';
import NicknameContext from './NicknameContext.jsx';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;

  return { currentChannelId };
};

const actionCreators = {
  addMessage: actions.addMessage,
};

const NewMessageForm = (props) => {
  const { currentChannelId, addMessage } = props;
  const nickname = useContext(NicknameContext);

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
        await addMessage(currentChannelId, message);
        resetForm();
      } catch (error) {
        console.log(error);
        setErrors({ networkError: error.message });
      } finally {
        inputRef.current.select();
      }
    },
  });

  return (
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
};

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
