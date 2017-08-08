// shows a form for a user to add input
import React from 'react'
// redux form is like redux.connect() for redux-form 
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'

import formFields from './formFields'

class SurveyForm extends React.Component {
    
    renderFields() {
        return formFields.map(({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        })
    }

    render() {
        return (
            <div>
                <h1>SurveyForm</h1>
                {/* handleSubmit provided as a prop by reduxForm.  Only submit valid forms */}
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                        <i className="material-icons right">done</i>
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}


function validate(values) {
    // values is object containing all values from form
    let errors = {}
    
    // check that emails are valid
    if (values.recipients) {
        errors.recipients = validateEmails(values.recipients) 
    }
    
    // no null components
    let keys = formFields.map((obj) => obj.name)
    keys.forEach((key) => {
        if (!values[key]) {
            errors[key] = `You must provide a ${key} value`
        }
    })

    // any errors will be passed as a prop to the respective input
    return errors
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    // do not destroy values within surveyForm when it is unmounted
    destroyOnUnmount: false
})(SurveyForm)
