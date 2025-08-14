//argv
console.log(process.argv);
console.log(process.argv[3]);

//process.env
console.log(process.env.COMPUTERNAME);

//pid
console.log(process.pid);

//cwd
console.log(process.cwd());

//title
console.log(process.title);

//memory usage
console.log(process.memoryUsage);

// update()
console.log(process.uptime());

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});

//exit()
process.exit(0);


console.log('jllll');