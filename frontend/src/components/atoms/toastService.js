import {toast} from 'react-toastify';

export const notifySuccess = (message, progress = 1000) => toast.success(message, {autoClose: progress});
export const notifyError = (message, progress = 2000) => toast.error(message, {autoClose: progress});
export const notify = (message, progress = 2000) => toast(message, {autoClose: progress});