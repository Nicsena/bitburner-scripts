/** @param {NS} ns */
export async function main(ns) {

ns.disableLog('ALL')

var ServerHacking = {
	"n00dles": false
}

ns.print(ServerHacking["n00dles"]);

// Change value
ServerHacking["n00dles"] = "Hello!"

ns.print(ServerHacking["n00dles"]);


}
