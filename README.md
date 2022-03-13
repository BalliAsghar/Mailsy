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

```console
    foo@bar:~$ mailsy m

    ID: 1
    From: Balli (m.asghar99@outlook.com)
    Subject: Hello
    message: Hello, World!

    ID: 2
    From: Balli (m.asghar99@outlook.com)
    Subject: Mailsy
    message: Quickly generate a disposable email.

```

**Open email in browser**

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

```

### FAQ

## How Mailsy works?

Mailsy is using [mail.tm](https://mail.tm/en/) API to generate a disposable email.
