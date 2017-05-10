module.exports = {
	dev: {
		options: {
			append: true,
			module: 'sizes'
		},
		cwd: '<%= config.src.app %>',
		src: [
			'**/*.html',
			'!*.html'
		],
		dest: '<%= config.dist.root %>sizes.js'
	},
	dist: {
		options: {
			append: true,
			module: 'sizes',
			htmlmin: {
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true
			}
		},
		cwd: '<%= config.src.app %>',
		src: [
			'**/*.html',
			'!*.html'
		],
		dest: '<%= config.dist.root %>sizes.js'
	}
};
