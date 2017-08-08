export default (emails) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    let invalidEmails = emails
                            .split(",")
                            .map((email) => email.trim())
                            // keep emails that fail the test
                            .filter(email => !re.test(email))

    if (invalidEmails.length) {
        return `These email are invalid: ${invalidEmails}`
    }

    return
}