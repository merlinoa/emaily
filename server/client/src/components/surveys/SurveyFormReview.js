import React from 'react'
import { connect } from 'react-redux'
import formFields from './formFields'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

// history is from react-router withRouter
const SurveyFormReview = ({ onCancelReview, formValues, submitSurvey, history }) => {

    const renderFormValues = formFields.map((obj) => {
        return (
            <div key={obj.name}>
                <label>{obj.label}</label>
                <div>{formValues[obj.name]}</div>
            </div>
        )
    })

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {renderFormValues}
            <button onClick={() => onCancelReview() } className="red btn-flat left white-text">
                Back
                <i className="material-icons right">done</i>
            </button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    const formValues = state.form.surveyForm.values
    return { formValues }
}
// withRouter allows components that are not in Router to use react-router
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
