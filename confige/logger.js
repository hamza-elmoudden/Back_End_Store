import {transports,format} from 'winston'
import expressWinston from 'express-winston'


export default expressWinston.logger({
	transports:[
	new transports.Console(),
	new transports.File({
		level:"warn",
		filename: "logsWarnings.log",
	}),

	new transports.File({
		level:"error",
		filename:"logsError.log"
	})
	],

	format: format.combine(
		format.json(),
		format.timestamp(),
		format.prettyPrint(),
		
	),
	statuslevels: true
	
})


// export default {logger}


