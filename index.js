#!/usr/bin/env node
import { Command } from "commander";
import utils from "./utils/index.js";

const program = new Command();

// Generate a new email
program
  .command("generate")
  .description("Generate a new email")
  .action(() => utils.createAccount());

// fetch messages from the inbox
program
  .command("messages")
  .description("Fetch messages from the inbox")
  .action(() => utils.fetchMessages());

// delete account
program
  .command("delete")
  .description("Delete account")
  .action(() => utils.deleteAccount());

// show details of the account
program
  .command("details")
  .description("Show details of the account")
  .action(() => utils.showDetails());

program.parse();
