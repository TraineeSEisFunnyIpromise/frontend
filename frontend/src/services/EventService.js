import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // getDetailProduct(id) {
  //   console.log(`Requesting event with ID: ${id}`); // Add logging to verify the ID
  //   return apiClient.get(`/detail/${id}`)
  //     .then(response => {
  //       console.log("router data fetched successfully:", response.data);
  //       return response;
  //     })
  //     .catch(error => {
  //       console.log("Error fetching detail product in eventservice:", error);
  //       throw error;
  //     });
  // },
  getDetailProduct() {
    //console.log(`Requesting event with ID: ${id}`); // Add logging to verify the ID
    return apiClient.get('/detail')
      .then(response => {
        console.log("router data fetched successfully:", response.data);
        return response;
      })
      .catch(error => {
        console.log("Error fetching detail product in eventservice:", error);
        throw error;
      });
  },
  getEvents() {
    return apiClient.get('/events')
      .then(response => {
        console.log("router data fetched successfully:", response.data);
        return response;
      })
      .catch(error => {
        console.error("Error fetching events in eventservice:", error);
        throw error;
      });
  },
  getMain() {
    return apiClient.get('/')
      .then(response => {
        console.log("Main data fetched successfully:", response.data);
        return response;
      })
      .catch(error => {
        console.error("Error fetching data in eventservice:", error);
        throw error;
      });
  
  },
}