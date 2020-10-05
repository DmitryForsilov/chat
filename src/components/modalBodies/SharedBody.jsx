import React from 'react';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

const SharedBody = (props) => {
  const { formik, inputRef, hideModalHandler } = props;

  return (
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <FormControl
            name="name"
            className="mb-2"
            ref={inputRef}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            required
          />
          <FormControl.Feedback className="d-block" type="invalid">
            {formik.errors.networkError}
            &nbsp;
          </FormControl.Feedback>
          <div className="d-flex justify-content-end">
            <Button className="mr-2" type="button" variant="secondary" onClick={hideModalHandler}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>Submit</Button>
          </div>
        </FormGroup>
      </Form>
    </Modal.Body>
  );
};

export default SharedBody;
