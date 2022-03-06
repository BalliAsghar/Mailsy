const axios = require("axios");
const fs = require("fs/promises");
const { copy } = require("./copy");

exports.createAccount = async () => {
  // get the available email domains
  const { data } = await axios.get("https://api.mail.tm/domains?page=1");

  // get the first domain
  const domain = data["hydra:member"][0].domain;
  console.log(domain);
  // generate a random email address
  const email = `${Math.random().toString(36).substring(7)}@${domain}`;

  // generate a random password
  const password = Math.random().toString(36).substring(7);

  try {
    const { data } = await axios.post("https://api.mail.tm/accounts", {
      address: email,
      password,
    });

    // write the data to file using the fs module
    await fs.writeFile("./account.json", JSON.stringify(data, null, 2));

    // copy the email to the clipboard
    await copy(email);

    console.log(`Account created: ${email}`);
  } catch (error) {
    console.error(error.message);
  }
};
