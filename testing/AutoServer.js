/** @param {NS} ns */
// Script made by Nicsena for the bitburner game.
// This script auto hacks one server that is scanned at a time in a repeat loop.
// GitHub Repo: https://github.com/Nicsena/bitburner-scripts

export async function main(ns) {

  // Variables
  var homeServer = "home"
  var securityLevelTooHigh = false

  // Disable Logging
  ns.disableLog("ALL");

  // Lists
  var ServerMaxSecurity = {
    "home": "100",
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
  };

  // List of scanned servers
  var list = ns.scan("home");

  // Remove the home server from list
  if(list.includes(homeServer)) var list = list.filter(server => server !== homeServer);

	while(true) {

	for (const host of list) {

    if(list.length === 0) return ns.print(`There are no servers in the list.`)
		if (host === homeServer) return ns.print(`Home server - cannot do anything to it`);

		await ns.sleep(100);

		// Player
    var playerCurrentHackingLevel = ns.getHackingLevel();

    // Server
    var serverName = host;
    var serverRoot = ns.hasRootAccess(serverName);
    var serverSecurityLevel = ns.getServerSecurityLevel(serverName);
    var serverSecurityWeakenTime = ns.getWeakenTime(serverName);
    var serverRequiredHackingLevel = ns.getServerRequiredHackingLevel(serverName);
    var serverRequiredPorts = ns.getServerNumPortsRequired(serverName);

		// Check if server security level is above or equal to the specified security level in ServerMaxSecurity array.
		if (serverSecurityLevel >= ServerMaxSecurity[serverName]) {

			var securityLevelTooHigh = true;
			ns.print(`The security level for ${serverName} is above the specified security level that it can go over. The current security level is ${serverSecurityLevel}.`)
		
			// Check for root access on server
			if(!serverRoot) ns.print(`${serverName} doesn't have root access. Unable to weaken server security.`);
		
			if(serverRoot) {
				ns.print(`${serverName} has root access. Now weakening server security. Weaken Time: ${serverSecurityWeakenTime}`)
				await ns.weaken(serverName);
        var serverNewSecurityLevel = ns.getServerSecurityLevel(serverName);
        var securityLevelTooHigh = false;

        // - Check the new security level of the server -

        // If the new security level is the same as the previous security level
        if(serverNewSecurityLevel === serverSecurityLevel) ns.print(`The security level of ${serverName} didn't go down. The current security level is ${serverNewSecurityLevel}`);
        
        // If the new security level is less than the previous security level
        if(serverNewSecurityLevel < serverSecurityLevel) ns.print(`The security of ${serverName} weakened. The new security level is ${serverNewSecurityLevel}`);

        // If the new security level is more than the previous security level
        if(serverNewSecurityLevel > serverSecurityLevel) ns.print(`The security of ${serverName} strengthened. The new security level is ${serverNewSecurityLevel}`);
				
			};

		};

    // Check if server is below to the specified security level in ServerMaxSecurity array.
    if (serverSecurityLevel < ServerMaxSecurity[serverName]) {

      ns.print(`The security for ${serverName} is below the specified security level that it can go over. The current security level is ${serverSecurityLevel} `)


    };


		};

	};

 
};
