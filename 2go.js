const fs = require("fs");

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

// console.log();

(async function() {
	console.log("WORKING");
	let text = fs.readFileSync("to_clean.txt", 'utf8')
	let params = process.argv.slice(2);
	let writeFile = params[0]?params[0]:"output.csv";
	console.log(params);

	// Remove trailing spaces
	text = text.replace(/\n*[^\S\r\n]+/g, " ")

	// Separate rows
	text = text.replace(/\r\n\|/g, "\n\n\n\n|")

	// Join collumns
	text = text.replace(/\|\r\n/g, " ")

	// Empty strings
	text = text.replace(/\|\s\|\s\|/g, '| "" | "" |');

	// Empty strings
	text = text.replace(/\|\s\|/g, '| "" |');

	// // Separate rows
	// text = text.replace(/[(\r\n)]/gm, " ")

	// // Separate rows
	// text = text.replace(/|    |/gm, " ")

// |    |

	// // Separate rows
	// text = text.replace(/\s^[\n\n\n]/g, " ")

	// Separate rows
	text = text.replace(/\|[\r\n]/gm, "|")

	// Separate rows
	text = text.replace(/\w+[\r\n]/gm, "")

	let separator = makeid(5);

	// Separate rows
	text = text.replace(/\n\n/gm, separator)

	// Separate rows
	text = text.replace(/[\n\r]+/gm, "");

	let separator_regex = new RegExp(`${separator}`, "gm");

	console.log(separator_regex);
	text = text.replace(separator_regex, "\n\n\n")

	// Empty strings
	text = text.replace(/\|\s\s\|/g, '| "" |');

	// Remove trailing spaces
	text = text.replace(/\n*[^\S\r\n]+/g, " ")

	// Remove starting |
	text = text.replace(/^\| /gm, '')

	// Remove ending |
	text = text.replace(/ \|$/gm, '')

	// Remove ending |
	text = text.replace(/ \|$/gm, '')

	// Cover words with comma with quotes
	text = text.replace(/([\w\/=&\.:]*,[\w\/=&\.:]*)/gm, '"$1"')

	// Cover words with comma with quotes
	text = text.replace(/ \| /gm, ',') 

	// Cover words with comma with quotes
	text = text.replace(/\n\n\n/gm, '\n') 

	// // Separate rows
	// text = text.replace(/\|\n/g, "|")

	// // Empty strings
	// text = text.replace(/[^\S]\n[^\S]/g, ' ');

	// console.log(text);

	fs.writeFileSync(writeFile, text);
})()