module.exports = {
	options: {
		watch: true
	},
	default: {
		src: [
			'<%= config.src.app %>sizes.js'
		],
		dest: '<%= config.dist.browserify %>sizes.js'
	}
};
