export default {
	createUser ({commit},user) {
		commit('ADD_USER',user)
	},
	initVideoData ({commit},data) {
		commit('INIT_VDIEO_DATA',data)
	},
	initMeCommentData ({commit},data) {
		commit('INIT_COMMENT_DATA',data)
	}
}