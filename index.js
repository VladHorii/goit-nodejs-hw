"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contacts_1 = require("./contacts");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
(async () => {
    const argv = program.opts();
    async function invokeAction(arg) {
        const { action, id, name, email, phone } = arg;
        const data = [];
        // Best of the best name for this function :D
        const getAndPushContactsList = async (data) => {
            const contacts = await (0, contacts_1.listContacts)();
            contacts.forEach((el) => data.push(el));
            return contacts;
        };
        switch (action) {
            case "list": {
                const contacts = await (0, contacts_1.listContacts)();
                contacts.forEach((el) => data.push(el));
                break;
            }
            case "get": {
                const foundContact = await (0, contacts_1.getContactById)(id);
                if (foundContact) {
                    data.push(foundContact);
                }
                else {
                    console.error("Invalide ID");
                }
                break;
            }
            case "add": {
                const contacts = await (0, contacts_1.addContact)(name, email, phone);
                contacts.forEach((el) => data.push(el));
                break;
            }
            case "remove": {
                const contacts = await (0, contacts_1.removeContact)(id);
                contacts.forEach((el) => data.push(el));
                break;
            }
            default:
                console.warn("\x1B[31m Unknown action type!");
        }
        console.table(data);
    }
    await invokeAction(argv);
})();
