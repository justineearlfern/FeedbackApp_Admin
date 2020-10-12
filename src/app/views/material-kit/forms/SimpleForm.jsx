import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Connection from "../../../../common/Connection"
const connection = new Connection();

class SimpleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      building: "",
      department: "",
    };
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
    console.log("submitted");
    console.log(event);
  };

  handleChange = event => {
    event.persist();
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value });
  };


  addBuilding = async (event) => {
    try {
      event.persist();
      event.preventDefault()
      const { building } = this.state
      const result = await connection.post('api/v1/building', { building: building })
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  addDepartment = async (event) => {
    try {
      const { department } = this.state
      event.persist();
      event.preventDefault()
      const result = await connection.post('api/v1/department', { department: department })
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let {
      building,
      department,
    } = this.state;

    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.addDepartment}
          onError={errors => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>

              <TextValidator
                className="mb-16 w-100"
                label="Department"
                onChange={this.handleChange}
                type="text"
                name="department"
                value={department}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <br></br>
              <Button color="primary" variant="contained" type="submit">
                <Icon>add_box</Icon>
                <span className="pl-8 capitalize">Add</span>
              </Button>

            </Grid>
          </Grid>
        </ValidatorForm>

        <ValidatorForm
          ref="form"
          onSubmit={this.addBuilding}
          onError={errors => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-16 w-100"
                label="Building"
                onChange={this.handleChange}
                type="text"
                name="building"
                value={building}
                validators={[
                  "required",
                  "minStringLength: 4",
                  "maxStringLength: 9"
                ]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button color="primary" variant="contained" type="submit">
                <Icon>add_box</Icon>
                <span className="pl-8 capitalize">Add</span>
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    );
  }
}

export default SimpleForm;
