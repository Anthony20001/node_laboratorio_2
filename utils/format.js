const PETITION_STRUCTURE = ($status, message, response) => {
    if(response !== null && $status >= 199 && $status <= 399){
        return {
            result: {
                message,
                status: $status
            },
            response
        }
    }

    return {
        error: {
            message,
            status: $status
        }
    }
}

module.exports = PETITION_STRUCTURE