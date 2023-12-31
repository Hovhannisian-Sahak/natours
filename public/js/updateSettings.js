/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
//type will be data(name,email) or password
export const updateSettings = async (data, type) => {
  const url =
    type === 'password'
      ? '/api/v1/users/updateMyPassword'
      : '/api/v1/users/updateMe';
  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()}updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};
