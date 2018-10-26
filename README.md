# bogpaddle
CLI utility for hashing a "secret" string to SHA512 and copying the hash to the clipboard.

**Note:** all hashes created by this utility are transformed to uppercase, which is NOT the default behavior of Node's crypto hashers.

## Installation

Install this utility from NPM:

```bash
npm i -g bogpaddle
# or 
yarn global add bogpaddle
```

## Usage

The default usage for bogpaddle is simply typing `bogpaddle hash` and entering your "password".

```bash
$ bogpaddle hash
? Enter the password to hash: [hidden]
Copied to clipboard.
```

If you'd rather not be prompted for input, you can pass a `-p "secret"` to bogpaddle. I recommend pulling the secret value from an environment variable to keep it out of your logs and history.

```bash
$ bogpaddle hash -p "secret"
Copied to clipboard.
```

Finally, you can write the hashed value out to your terminal rather than copying to your clipboard.

```bash
$ bogpaddle hash -d -p "secret"
BD2B1AAF7EF4F09BE9F52CE2D8D599674D81AA9D6A4421696DC4D93DD0619D682CE56B4D64A9EF097761CED99E0F67265B5F76085E5B0EE7CA4696B2AD6FE2B2
```

## Security

You'll note that I'm using "password" and "secret" in quotes. This is because the SHA512 shouldn't be used to hash passwords. Instead you should be using a true password hasher like bcrypt. I have a specific use for hashing a hidden string to SHA512, thus this utility.
