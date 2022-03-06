#!/usr/bin/env node
const { Command } = require("commander");
const { createAccount } = require("./utils");
const program = new Command();

// Generate a new email
program.command("generate").action(() => createAccount());

program.parse();
