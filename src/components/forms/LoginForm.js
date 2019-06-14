import React, { PureComponent } from 'react';
import {Form,Button} from "semantic-ui-react";
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends PureComponent {

  state = {
    data:{
      email:'',
      password:''
    },
    loading:false,
    errors:{}
  }

  onChange = (e) =>{
    const {data} = this.state;
    this.setState({
      data:{...data,[e.target.name]:e.target.value}
    });
  }

  onSubmit = () =>{
    const {data} = this.state;
    const errors = this.validate(data);
    this.setState({errors});
    if(Object.keys(errors).length === 0){
      this.props.submit(data);
    }
  }

  validate = (data) =>{
    const errors = {}
    if(!Validator.isEmail(data.email)) errors.email = 'invalid email';
    if(!data.password) errors.password = "Can't be blank";
    return errors;
  }

  render() {
    const { data, errors} = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange = {this.onChange}
          />
          {errors.email && <InlineError text = {errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Passoword</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="make it secure"
            value={data.password}
            onChange = {this.onChange}
          />
          {errors.password && <InlineError text = {errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit:PropTypes.func.isRequired
}

export default LoginForm;
