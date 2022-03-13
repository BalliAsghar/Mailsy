import axios from "axios";
import fs from "fs/promises";
import copy from "./copy.js";
import { Low, JSONFile } from "lowdb";
import open from "open";
import ora from "ora";
import chalk from "chalk";

const adapter = new JSONFile("account.json");

const db = new Low(adapter);

const createAccount = async () => {
  // start the spinner
  const spinner = ora("creating...").start();

  // read the account data from file
  await db.read();

  // if account already exists, then show message and return
  if (db.data !== null) {
    spinner.stop();
    console.log(
      `${chalk.redBright("Account already exists")}: ${chalk.underline.yellow(
        "delete account to create a new one"
      )}`
    );
    return;
  }

  // get the available email domains
  const { data } = await axios.get("https://api.mail.tm/domains?page=1");

  // get the first domain
  const domain = data["hydra:member"][0].domain;

  // generate a random email address
  const email = `${Math.random().toString(36).substring(7)}@${domain}`;

  // generate a random password
  const password = Math.random().toString(36).substring(7);

  try {
    const { data } = await axios.post("https://api.mail.tm/accounts", {
      address: email,
      password,
    });

    // add password to the data object
    data.password = password;

    // copy the email to the clipboard
    await copy(email);

    // get Jwt token
    const { data: token } = await axios.post("https://api.mail.tm/token", {
      address: email,
      password,
    });

    // write token to a data object
    data.token = token;

    //write the data object to the account.json file
    db.data = data;

    await db.write();

    // stop the spinner
    spinner.stop();

    console.log(
      `${chalk.blue("Account created")}: ${chalk.underline.green(email)}`
    );
  } catch (error) {
    // stop the spinner
    spinner.stop();
    console.error(`${chalk.redBright("Error")}: ${error.message}`);
  }
};

const fetchMessages = async () => {
  // start the spinner
  const spinner = ora("fetching...").start();

  await db.read();

  const account = db.data;

  if (account === null) {
    // stop the spinner
    spinner.stop();

    console.log(`${chalk.redBright("Account not created yet")}`);

    return;
  }

  // get the messages
  const { data } = await axios.get("https://api.mail.tm/messages", {
    headers: {
      Authorization: `Bearer ${account.token.token}`,
    },
  });
  // get the emails
  const emails = data["hydra:member"];

  // stop the spinner
  spinner.stop();

  // if there are no emails, then there are no messages
  if (emails.length === 0) {
    console.log(`${chalk.redBright("No Emails")}`);
    return null;
  } else {
    return emails;
  }
};

const deleteAccount = async () => {
  // start the spinner
  const spinner = ora("deleting...").start();

  await db.read();

  const account = db.data;

  try {
    // if the account is null, then the account has not been created yet
    if (account === null) {
      // stop the spinner
      spinner.stop();

      console.log(`${chalk.redBright("Account not created yet")}`);
      return;
    }

    await axios.delete(`https://api.mail.tm/accounts/${account.id}`, {
      headers: {
        Authorization: `Bearer ${account.token.token}`,
      },
    });

    // delete the account.json file
    await fs.unlink("./account.json");

    // stop the spinner
    spinner.stop();

    console.log(`${chalk.blue("Account deleted")}`);
  } catch (error) {
    console.error(error.message);
  }
};

const showDetails = async () => {
  await db.read();

  const account = db.data;

  // if the account is null then the account has not been created yet
  if (account === null) {
    console.log("Account not created yet");
    return;
  }

  // get the account details
  const { data } = await axios.get(
    `https://api.mail.tm/accounts/${account.id}`,
    {
      headers: {
        Authorization: `Bearer ${account.token.token}`,
      },
    }
  );

  // display the account details
  console.log(`
    Email: ${data.address}
    createdAt: ${new Date(data.createdAt).toLocaleString()}
  `);
};

// open specific email
const openEmail = async (email) => {
  try {
    await db.read();

    const account = db.data;

    const mails = await fetchMessages();

    const mailToOpen = mails[email - 1];

    // get email html content
    const { data } = await axios.get(
      `https://api.mail.tm/messages/${mailToOpen.id}`,
      {
        headers: {
          Authorization: `Bearer ${account.token.token}`,
        },
      }
    );

    // write the email html content to a file
    await fs.writeFile("./email.html", data.html[0]);

    // open the email html file in the browser
    await open("./email.html");
  } catch (error) {
    console.error(error.message);
  }
};

// export the functions using es6 syntax
const utils = {
  createAccount,
  fetchMessages,
  deleteAccount,
  showDetails,
  openEmail,
};

export default utils;
