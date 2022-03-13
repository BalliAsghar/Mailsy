#!/usr/bin/env node
import { Command } from "commander";
import utils from "./utils/index.js";
import inquirer from "inquirer";

const program = new Command();

// Generate a new email
program
  .command("g")
  .description("Generate a new email")
  .action(() => utils.createAccount());

// fetch messages from the inbox
program
  .command("m")
  .description("Fetch messages from the inbox")
  .action(async () => {
    try {
      const emails = await utils.fetchMessages();

      if (!emails) return;

      // show the emails using inquirer
      const { email } = await inquirer.prompt([
        {
          type: "list",
          name: "email",
          message: "Select an email",
          choices: emails.map((email, index) => ({
            name: `${index + 1}. ${email.subject} - from ${email.from.address}`,
            value: index + 1,
          })),
        },
      ]);

      // open the email
      utils.openEmail(email);
    } catch (error) {
      console.error(error.message);
    }
  });

// delete account
program
  .command("d")
  .description("Delete account")
  .action(() => utils.deleteAccount());

// open specific email
program
  .command("o")
  .argument("<email>", "Email number to open")
  .description("Open specific email, e.g. '1'")
  .action((email) => utils.openEmail(email));

// show details of the account
program
  .command("me")
  .description("Show details of the account")
  .action(() => utils.showDetails());

program.parse();
