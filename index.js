#!/usr/bin/env node
const { Command } = require("commander");
const {
  createAccount,
  fetchMessages,
  deleteAccount,
  showDetails,
} = require("./utils");
const program = new Command();

// Generate a new email
program
  .command("generate")
  .description("Generate a new email")
  .action(() => createAccount());

// fetch messages from the inbox
program
  .command("messages")
  .description("Fetch messages from the inbox")
  .action(() => fetchMessages());

// delete account
program
  .command("delete")
  .description("Delete account")
  .action(() => deleteAccount());

// show details of the account
program
  .command("details")
  .description("Show details of the account")
  .action(() => showDetails());

program.parse();
