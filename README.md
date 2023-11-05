# Mailsy

![GitHub Repo stars](https://img.shields.io/github/stars/BalliAsghar/Mailsy?color=ff&style=for-the-badge)

⚡️ Quickly generate a disposable email.

# Extensions

- [Alfred](https://github.com/BalliAsghar/mailsy-alfred)
- [Raycast](https://www.raycast.com/BalliAsghar/mailsy)

## Screenshots

![alt text](https://raw.githubusercontent.com/BalliAsghar/Mailsy/main/screenshot/Mailsy.png)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Mailsy.

```console
npm install mailsy -g
```

Macos users can install mailsy via homebrew

```console
brew install mailsy
```

## Usage

**Creating Email**

Email will be copied to clipboard!

```console
foo@bar:~$ mailsy g
random@email.com
```

**Fetching Emails**

**Note:**

Hit Enter to open the email in your default browser.

```console
foo@bar:~$ mailsy m
? Select an email (Use arrow keys)
❯ 1. Hello, World! - from m.asghar99@outlook.com
  2. Mailsy - from m.asghar99@outlook.com

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

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=BalliAsghar/Mailsy&type=Date)](https://star-history.com/#BalliAsghar/Mailsy&Date)

### FAQ

## How Mailsy works?

Mailsy is using [mail.tm](https://mail.tm/en/) API to generate a disposable email.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
