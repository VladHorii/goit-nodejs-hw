import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join(__dirname, "db/contacts.json");

export type ID = string;

export interface IContact {
  id: ID;
  name: string;
  email: string;
  phone: string;
}

// TODO: задокументировать каждую функцию
/**
 *
 * @returns Promise<IContact[]>
 */
export async function listContacts() {
  try {
    const file = await fs.readFile(contactsPath, "utf-8");
    const result: IContact[] = JSON.parse(file);
    return result;
  } catch (error) {
    console.error(error);
    const result: IContact[] = [];
    return result;
  }
}

export async function getContactById(contactId: ID) {
  const contacts = await listContacts();
  const foundContact = contacts.find(({ id }) => id === contactId);
  return foundContact;
}

export async function removeContact(contactId: ID) {
  const contacts = await listContacts();
  const newContactsDataList = contacts.filter(({ id }) => id !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(newContactsDataList));

  return newContactsDataList;
}

export async function addContact(name: string, email: string, phone: string) {
  const contacts = await listContacts();
  const contact: IContact = { id: nanoid(4), name, email, phone };
  contacts.push(contact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
