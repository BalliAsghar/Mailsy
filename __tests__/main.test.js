import {describe, expect, it, beforeAll, afterAll} from "vitest"
import utils from "../utils/index"
import fs from "node:fs/promises"

beforeAll(async () => await utils.deleteAccount());
afterAll(async () => await utils.deleteAccount());

describe("Commands", () => {
    describe("g", () => {
        it("should generate a new email", async () => {
            await utils.createAccount();
            const data = await fs.readFile("./data/account.json", "utf-8");
            const account = JSON.parse(data);
            expect(data).not.toBe(null);
            expect(account.email).not.toBe(null);
            expect(account.password).not.toBe(null);
            expect(account.token.token).not.toBe(null);
        })
    });
    describe("me", () => {
        it("should show details of the account", async () => {
            await utils.createAccount();
            await utils.showDetails();
            const data = await fs.readFile("./data/account.json", "utf-8");
            const account = JSON.parse(data);
            expect(data).not.toBe(null);
            expect(account.email).not.toBe(null);
            expect(account.password).not.toBe(null);
            expect(account.token.token).not.toBe(null);

        })
    });
    describe("d", () => {
        it("should delete the account", async () => {
            await utils.createAccount();
            await utils.deleteAccount();
            await expect(fs.readFile("./data/account.json", "utf-8")).rejects.toThrow("no such file or directory");
        })
    });
    describe("me", () => {
        it("should show details of the account", async () => {
            await utils.createAccount();
            await utils.showDetails();
            const data = await fs.readFile("./data/account.json", "utf-8");
            const account = JSON.parse(data);
            expect(data).not.toBe(null);
            expect(account.email).not.toBe(null);
            expect(account.password).not.toBe(null);
            expect(account.token.token).not.toBe(null);

        })
    });
});
