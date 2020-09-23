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
  }, [null]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }) => {
      const message = { nickname, body };

      addMessage(currentChannelId, message);
      formik.resetForm();
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
          />
          <Button type="submit" aria-label="submit" variant="primary" disabled={formik.isSubmitting}>Submit</Button>
          <FormControl.Feedback className="d-block" type="invalid">&nbsp;</FormControl.Feedback>
        </div>
      </FormGroup>
    </Form>
  );
};

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
