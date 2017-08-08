// SurveyNew shows SurveyForm and SurveyFormReview
import React from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showFormReview: false
        }
    }

    render() {
        const showFormReview = this.state.showFormReview
        return (
            <div>
                {showFormReview ?
                     <SurveyFormReview  onCancelReview={() => this.setState({ showFormReview: false })}/> :
                     <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} /> }
            </div>
        )
    }
}

export default reduxForm({
    // tie SurveyNew to SurveyForm so that values in SurveyForm will be dumped if form is canceled
    form: 'surveyForm'
})(SurveyNew)
