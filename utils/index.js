import axios from "axios";
import fs from "fs/promises";
import copy from "./copy.js";
import { Low, JSONFile } from "lowdb";
import open from "open";
import ora from "ora";

const adapter = new JSONFile("account.json");

// start the spinner
const spinner = ora("creating...").start();

const db = new Low(adapter);

const createAccount = async () => {
  // read the account data from file
  await db.read();

  // if account already exists, then show message and return
  if (db.data !== null) {
    console.log("Account already exists");
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

    console.log(`Account created: ${email}`);
  } catch (error) {
    console.error(error.message);
  }
};

const fetchMessages = async () => {
  await db.read();

  const account = db.data;

  if (account === null) {
    console.log("Account does not exist");
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

  // if there are no emails, then there are no messages
  emails.length === 0 ? console.log("No Emails") : null;

  return emails;
};

const deleteAccount = async () => {
  await db.read();

  const account = db.data;

  try {
    // if the account is null, then the account has not been created yet
    if (account === null) {
      console.log("Account not created yet");
      return;
    }

    await axios.delete(`https://api.mail.tm/accounts/${account.id}`, {
      headers: {
        Authorization: `Bearer ${account.token.token}`,
      },
    });

    // delete the account.json file
    await fs.unlink("./account.json");

    console.log("Account deleted");
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
