const axios = require("axios");
const fs = require("fs/promises");
const { copy } = require("./copy");

exports.createAccount = async () => {
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

    // write the data to file using the fs module
    await fs.writeFile("./account.json", JSON.stringify(data, null, 2));

    console.log(`Account created: ${email}`);
  } catch (error) {
    console.error(error.message);
  }
};

exports.fetchMessages = async () => {
  // read the account data from file
  const account = JSON.parse(await fs.readFile("./account.json"));

  // if the account is {}, then the account has not been created yet
  if (Object.keys(account).length === 0) {
    console.log("Account not created yet");
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

  // display the from and subject of the emails
  emails.forEach((email) => {
    console.log(`From: ${email.from.name} (${email.from.address})`);
    console.log(`Subject: ${email.subject}`);
  });
};

exports.deleteAccount = async () => {
  try {
    const account = JSON.parse(await fs.readFile("./account.json"));

    // if the account is {}, then the account has not been created yet
    if (Object.keys(account).length === 0) {
      console.log("No Account exits to delete");
      return;
    }

    await axios.delete(`https://api.mail.tm/accounts/${account.id}`, {
      headers: {
        Authorization: `Bearer ${account.token.token}`,
      },
    });

    // empty the account.json file
    await fs.writeFile("./account.json", "{}");

    console.log("Account deleted");
  } catch (error) {
    console.error(error.message);
  }
};

exports.showDetails = async () => {
  // read the account data from file
  const account = JSON.parse(await fs.readFile("./account.json"));

  // if the account is {}, then the account has not been created yet
  if (Object.keys(account).length === 0) {
    console.log("No Account exits to show details");
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
