# Mailsy

⚡️ Quickly generate a disposable email.

## Screenshots

![alt text](https://raw.githubusercontent.com/BalliAsghar/Mailsy/main/screenshot/Mailsy.png)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Mailsy.

```console
npm install mailsy -g
```

## Usage

**Creating Email**

Email will be copied to clipboard!

```console
foo@bar:~$ mailsy g
random@email.com
```

**Fetching Emails**

**Note**

#### output structure

- ID - Subject - From

```console
foo@bar:~$ mailsy m
? Select an email (Use arrow keys)
❯ 1. Hello, World! - from m.asghar99@outlook.com
  2. Mailsy - from m.asghar99@outlook.com

```

**Open email in browser**

**Note**

- this feature will be removed in the future.

if you want see the full email use "o" command with ID if the email e.g 2

```console
foo@bar:~$ mailsy o 2

```

**Delete Account**

if you want to dispose a email and get the new one use:

```console
foo@bar:~$ mailsy d
Account deleted
```

**Details about Account**

```console
foo@bar:~$ mailsy me

 Email: random@random.com
 createdAt: 13/03/2022, 21:32:09

```

### FAQ

## How Mailsy works?

Mailsy is using [mail.tm](https://mail.tm/en/) API to generate a disposable email.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
