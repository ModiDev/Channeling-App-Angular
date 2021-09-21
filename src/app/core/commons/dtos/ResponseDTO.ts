/**
 * Response DTO.
 */
export interface ResponseDTO {
    message: string;
    status: number;
    data?: any;
}

const responseNotAuthorized: ResponseDTO = {message: 'Unauthorized!', status: 401};
const responseRequestInvalid: ResponseDTO = {message: 'Request invalid!', status: 400};
const responseDuplicateIdentified: ResponseDTO = {message: 'Duplicate Identified!', status: 409};
const responseInternalServerError: ResponseDTO = {message: 'Internal Server Error!', status: 500};
const responseSuccessfullyCreated: ResponseDTO = {message: 'Successfully Created!', status: 201};
const responseNotFound: ResponseDTO = {message: 'Not Found!', status: 404};
const responseOutOfRange: ResponseDTO = {message: 'Out of Range!', status: 416};

/**
 * The not authorized response.
 *
 * @return not authorized response
 */
export const notAuthorized = () => {
    return responseNotAuthorized;
};

/**
 * The request invalid response.
 *
 * @return request invalid response
 */
export const requestInvalid = () => {
    return responseRequestInvalid;
};

/**
 * The duplicate identified response.
 *
 * @return duplicate identified response
 */
export const duplicateIdentified = () => {
    return responseDuplicateIdentified;
};

/**
 * The out of range response.
 *
 * @return out of range response
 */
export const outOfRange = (data?: any) => {
    if (data) {
        responseSuccessfullyCreated.data = data;
    }
    return responseOutOfRange;
};


/**
 * The internal server error response.
 *
 * @return internal server error response
 */
export const internalServerError = () => {
    return responseInternalServerError;
};

/**
 * The successfully created response.
 *
 * @param data
 * @return successfully created response
 */
export const successfullyCreated = (data?: any) => {
    if (data) {
        responseSuccessfullyCreated.data = data;
    }
    return responseSuccessfullyCreated;
};

/**
 * The not found response.
 *
 * @return not found response
 */
export const notFound = () => {
    return responseNotFound;
};
