#!/usr/bin/env node
const { Command } = require("commander");
const { createAccount, fetchMessages } = require("./utils");
const program = new Command();

// Generate a new email
program.command("generate").action(() => createAccount());

// fetch messages from the inbox
program.command("messages").action(() => fetchMessages());

program.parse();
