/** @param {NS} ns */
// Script made by Nicsena for the bitburner game.
// This script auto hacks one server at a time in a repeat loop.
// GitHub Repo: https://github.com/Nicsena/bitburner-scripts

export async function main(ns) {

// Disable Logging
ns.disableLog('ALL')

// Lists
var ServerHacking = {
	"n00dles": false,
	"foodnstuff": false,
	"joesguns": false,
	"hong-fang-tea": false,
	"harakiri-sushi": false,
	"iron-gym": false,
	"max-hardware": false,
	"CSEC": false,
	"zer0": false,
	"nectar-net": false,
	"harakiri-sushi": false,
	"neo-net": false,
	"omega-net": false,
	"crush-fitness": false,
	"rothman-uni": false,
	"summit-uni": false,
	"aevum-police": false,
	"the-hub": false,
	"netlink": false,
	"I.I.I.I": false,
	"millenium-fitness": false,
	"aerocorp": false,
	"deltaone": false,
	"global-pharm": false
}

var ServerMaxSecurity = {
	"n00dles": "10",
	"foodnstuff": "11",
	"joesguns": "17",
	"hong-fang-tea": "35",
	"harakiri-sushi": "20",
	"iron-gym": "35",
	"max-hardware": "20",
	"CSEC": "10",
	"zer0": "30",
	"nectar-net": "25",
	"harakiri-sushi": "20",
	"neo-net": "30",
	"omega-net": "30",
	"crush-fitness": "48",
	"rothman-uni": "55",
	"summit-uni": "60",
	"aevum-police": "82",
	"the-hub": "41",
	"netlink": "72",
	"I.I.I.I": "10",
	"millenium-fitness": "59",
	"aerocorp": "89",
	"deltaone": "84",
	"global-pharm": "86"
}

var ServerPorts = {
	"n00dles": "0",
	"foodnstuff": "0",
	"joesguns": "0",
	"hong-fang-tea": "0",
	"harakiri-sushi": "0",
	"iron-gym": "1",
	"max-hardware": "1",
	"CSEC": "1",
	"zer0": "1",
	"nectar-net": "0",
	"harakiri-sushi": "0",
	"neo-net": "0",
	"omega-net": "2",
	"crush-fitness": "2",
	"rothman-uni": "3",
	"summit-uni": "3",
	"aevum-police": "4",
	"the-hub": "2",
	"netlink": "3",
	"I.I.I.I": "3",
	"millenium-fitness": "3",
	"aerocorp": "5",
	"deltaone": "4",
	"global-pharm": "4"
}

// Hosts List
// Replace "home" with ns.getHostname() if you want scan from the server itself, instead from home computer
var List = ns.scan("home");

while(true) {

for (const host of List) {

if(!ServerHacking[host]) {
    ns.print(`Server ${Name} doesn't exist in the ServerHacking List.`);
	return await ns.sleep(1000);
} 

if(!ServerMaxSecurity[host]) {
    ns.print(`Server ${Name} doesn't exist in the ServerMaxSecurity List.`);
	return await ns.sleep(1000);
}

if(!ServerPorts[host]) {
	ns.print(`Server ${Name} doesn't exist in the ServerPorts List.`)
	return await ns.sleep(1000);
}

await ns.sleep(250);

// Player
var currentHackingLevel = ns.getHackingLevel()

// Server
var Name = host;
var Root = ns.hasRootAccess(Name);
var SecurityLevel = ns.getServerSecurityLevel(Name)
var SecurityWeakenTime = ns.getWeakenTime(Name)
var RequiredHackingLevel = ns.getServerRequiredHackingLevel(Name);
var RequiredPorts = ns.getServerNumPortsRequired(Name);

// Check if server security level is above or below the specified security level in ServerMaxSecurity array.
if(SecurityLevel > ServerMaxSecurity[Name]) {

    ns.print(`${Name} is above specified max security level. Current Security Level: ${SecurityLevel}.`)
	
	// Check for Root
	if(Root === true) {
		ns.print(`Weakening ${Name}'s Security. Weakening Time: ${SecurityWeakenTime}`)
	    await ns.weaken(Name)
		var newSecurityLevel = ns.getServerSecurityLevel(Name)

		// newSecurityLevel is equal to SecurityLevel
		if(newSecurityLevel === SecurityLevel) {
			ns.print(`${server} Security Level didn't go down. Current Security Level: ${currentLevel}`);	
		} 

		// newSecurityLevel is less than SecurityLevel
		if(newSecurityLevel < SecurityLevel) {
			ns.print(`Weakened ${Name}'s Security. New Security Level is ${newSecurityLevel}`)
		}

	} else {
		ns.print(`Unable to weaken ${Name}'s Security because of no root access.`)
	};

} else {

	ns.print(`${Name} is below specified max security level. Current Security Level: ${SecurityLevel}`)

	// Check if player's hacking level is above or equal to the server required hacking level
	if(currentHackingLevel >= RequiredHackingLevel) {
		ns.print(`Player Hacking Level is above the or equal to the Required Hacking Level for ${Name}.`)

		// Check if server has root access or not
		if(Root === true) {
			ns.print(`${Name} has root access.`);
			
			ServerHacking[Name] = true
			ns.print(`Hacking ${Name}`);
			await ns.hack(Name, { threads: 1 });
			var newSecurityLevel = ns.getServerSecurityLevel(Name)
			ns.print(`Hacked ${Name}. New Security Level: ${newSecurityLevel}`);
			ServerHacking[Name] = false
			
		} else {

			ns.print(`${Name} doesn't have root access. Attempting to gain root access.`);

			// Check if server has required ports.
			if(RequiredPorts > 0) {
			return ns.print(`${Name} has required ports to be able to nuke to gain root access. Aborting.`)
			};

			// Check if NUKE.exe is on the home computer
			var NukeExists = ns.fileExists("NUKE.exe", "home")
			
			if(NukeExists === true) {
				// Run the NUKE.exe program to gain root access on the server
				ns.print(`Running NUKE.exe on ${Name}`);
				ns.nuke(Name)
				var NewRoot = ns.hasRootAccess(Name);

				// Check if server now has root access or not.
				if(NewRoot === true) {
					ns.print(`${Name} now has root access.`)
				} else {
					ns.print(`Failed to gain root access on ${Name}.`)
				}

		

				
			} else {
				
			return ns.print("home computer doesn't have the NUKE.exe program. Aborting.")
				
			}
			

		}


	} else {

	ns.print(`Player is below the required hacking level for ${Name}.`)
	
	}

};


};


}

};
