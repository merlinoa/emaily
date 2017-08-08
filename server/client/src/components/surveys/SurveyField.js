// contains logic to render a single label and input
import React from 'react'

// props.input provided by reduxForm
export default ({ input, label, meta: { error, touched } }) => {
    //console.log(meta)
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: 5 }}/>
            <div className="red-text" style={{ marginBottom: 20}}>
                {touched && error}
            </div>
        </div>
    )
}