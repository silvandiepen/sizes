module.exports = {
  options: {
    apiKey: '',
    checkSigs: true,
	sigFile: 'grunt/tinypng_file_sigs.json',
	sigFileSpace: 2,
	summarize: true,
	showProgress: false,
	stopOnImageError: false
  },
  compressPNG: {
    expand: true,
    src: ['<%= config.src.app %>img/**/*.png', '<%= config.src.app %>img/**/*.jpg'],
    dest: ''
  }
};
