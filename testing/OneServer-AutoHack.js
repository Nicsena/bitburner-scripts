/** @param {NS} ns */
export async function main(ns) {

ns.print("Script started!");

var server = "n00dles";
var hacking = false;

while(true) {

if(hacking === false) return await ns.sleep(500);

var serverSecurity = ns.getServerSecurityLevel(server)

if (serverSecurity > 1.252) {
var currentLevel = serverSecurity

await ns.weaken(server);
var newLevel = ns.getServerSecurityLevel(server);

// newLevel is more than currentLevel
if(newLevel > currentLevel) {
ns.print(`${server} Security Level went up! It is now ${newLevel}`)
}

// newLevel is equal to currentLevel
if(newLevel === currentLevel) {
ns.print(`${server} Security Level didn't go down. Current Security Level: ${currentLevel}`);	
} 

// newLevel is less than currentLevel
if(newLevel < currentLevel) {
ns.print(`${server} Security Level went down to ${newLevel}.`)
}

} else {

var hacking = true;
ns.print(`Hacking ${server}`);
await ns.hack(server);
ns.print(`Hacked ${server}`);
var hacking = false;

};

}

}
