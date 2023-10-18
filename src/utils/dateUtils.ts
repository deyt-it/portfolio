export const dateUtils = {
	getStringsFromTimestamp: function(timestamp: Date): Array<string> {
		const date = new Date(timestamp)
		const year = date.getFullYear()
		const month = date.getMonth()+1
		
		return [year.toString(), month.toString()]
	}
}