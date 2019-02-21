const   gulp = require('gulp');
const   browserSync = require('browser-sync');
const   watch = require('gulp-watch');


const   livereliad = browserSync.create();
const   reload = livereliad.reload;

const BROWSER_SYNC = 'browser-sync';
const WATCHER = 'watcher';
const DEFAULT = 'default';

gulp.task(BROWSER_SYNC, () => {
	livereliad.init({
		server: {
			baseDir: "./"
		},
		host: 'localhost',
		port: 3000,
		logPrefix: "landing",
		reloadDelay: 500
	});
});


// watcher
gulp.task( WATCHER, () => {
	watch(`./assets/js/**/*.js`, reload);
	watch('./*html', reload);
});


gulp.task(
	DEFAULT,
	[
		WATCHER,
		BROWSER_SYNC
	]
);