import _axios from "axios"
import axiosRetry from "axios-retry"

const axios = _axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    timeout: 5000,
})

const retryDelay = (retryNumber = 0) => {
    const seconds = Math.pow(2, retryNumber) * 1000
    const randomMs = 1000 * Math.random()
    return seconds + randomMs
}

axiosRetry(axios, {
    retries: 3,
    retryDelay,
    // retry on Network Error & 5xx responses
    retryCondition: axiosRetry.isRetryableError,
})

export default axios
