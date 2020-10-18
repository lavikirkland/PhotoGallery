import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class PhotoService{

    // constructor(){}

    async getPhotos(page) {
        var url = '';
        if (page) url = `${API_URL}/api/photos/${page}`;
        else url = `${API_URL}/api/photos/`;
        return axios.get(url).then(response => response.data);
    }

    getPhoto(photoId) {
        const url = `${API_URL}/api/photos/${photoId}`;
        return axios.get(url).then(response => response.data);
    }

    annotatePhoto(photoId, photoInfo) {
        const url = `${API_URL}/api/photos/${photoId}`;
        return axios.put(url, photoInfo).then(response => response.data);
    }

    // getPhoto(photoId) {
    //     const url = `${API_URL}/api/photos/${photoId}`;
    //     return axios.get(url).then(response => response.data);
    // }
    // deletePhoto(photoId){
    //     const url = `${API_URL}/api/photos/${photoId}`;
    //     return axios.delete(url);
    // }
    // addPhoto(photo){
    //     const url = `${API_URL}/api/photos/`;
    //     return axios.post(url, photo);
    // }
}