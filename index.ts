import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  IContact,
} from "./contacts";

import { Command } from "commander";
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

interface OptionValues {
  [key: string]: string;
}

(async () => {
  const argv = program.opts();

  async function invokeAction(arg: OptionValues) {
    const { action, id, name, email, phone } = arg;
    const data: IContact[] = [];

    // Best of the best name for this function :D
    const getAndPushContactsList = async (data: IContact[]) => {
      const contacts = await listContacts();
      contacts.forEach((el) => data.push(el));
      return contacts;
    };

    switch (action) {
      case "list": {
        const contacts = await listContacts();
        contacts.forEach((el) => data.push(el));
        break;
      }

      case "get": {
        const foundContact = await getContactById(id);
        if (foundContact) {
          data.push(foundContact);
        } else {
          console.error("Invalide ID");
        }
        break;
      }

      case "add": {
        const contacts = await addContact(name, email, phone);
        contacts.forEach((el) => data.push(el));
        break;
      }

      case "remove": {
        const contacts = await removeContact(id);
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
