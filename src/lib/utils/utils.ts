// check if we should reroute based on current path
function checkValidRerouteLocation(currentPath: string) {
	return !['/', '/signup', '/login', '/api/users/login', '/api/users'].includes(currentPath);
}

// check if path is valid to visit when authed
function checkValidAuthedPage(currentPath: string) {
	return ['/', '/signup', '/login'].includes(currentPath);
}

export { checkValidRerouteLocation, checkValidAuthedPage };
