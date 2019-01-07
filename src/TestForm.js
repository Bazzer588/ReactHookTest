import React from 'react';
import TextField from "./TextField";

export default class TestForm extends React.Component {

    onChangeField = (name,value) => {
        this.setState({ [name]: value });
    };

    render () {
        const state = this.state || {};
        return (
            <>
                <TextField name="gender"      value={state.gender}      onChangeField={this.onChangeField} />
                <TextField name="firstName"   value={state.firstName}   onChangeField={this.onChangeField} />
                <TextField name="lastName"    value={state.lastName}    onChangeField={this.onChangeField} />
                <TextField name="dateOfBirth" value={state.dateOfBirth} onChangeField={this.onChangeField} />
            </>
        );
    }
}
