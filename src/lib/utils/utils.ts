// check if we should reroute based on current path
function checkValidRerouteLocation(currentPath: string) {
	return !['/', '/signup', '/login', '/api/users/login', '/api/users'].includes(currentPath);
}

export default checkValidRerouteLocation;
