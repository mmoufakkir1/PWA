const axios = require('axios');

class APIService {
	get(url) {
		return axios.get(url);
	}

	post(url, data){
		return axios.post(url, data);
	}

	delete(url) {
		return axios.delete(url);
	}

	patch(url, data) {
		return axios.patch(url, data);
	}


	buildUserApiCall(endpoint) {
		let baseURL = 'http://localhost:9000';//process.env.SERVER_NAME;
		return baseURL + '/' + endpoint;
	}

	composerGet(endpoint) {
		return this.get(this.buildUserApiCall(endpoint));
	}

	composerPost(endpoint, data) {
		return this.post(this.buildUserApiCall(endpoint), data);
	}

	composerDelete(endpoint) {
		return this.delete(this.buildUserApiCall(endpoint));
	}

	composerPut(endpoint, data) {
		return this.put(this.buildUserApiCall(endpoint) , data);
	}

	composerPatch(endpoint, data) {
		return this.patch(this.buildUserApiCall(endpoint) ,  data);
	}	
}

module.exports = new APIService();
