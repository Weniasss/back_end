import axios from "axios";

const REVIEW_API_BASE_URL = "http://localhost:8080/api/v1/users";

class UserService {
	saveUser(user){
		return axios.post(REVIEW_API_BASE_URL,user)
	}
}
export default new UserService();