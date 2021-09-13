"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContact = exports.removeContact = exports.getContactById = exports.listContacts = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const nanoid_1 = require("nanoid");
const path_1 = __importDefault(require("path"));
const contactsPath = path_1.default.join(__dirname, "db/contacts.json");
// TODO: задокументировать каждую функцию
/**
 *
 * @returns Promise<IContact[]>
 */
async function listContacts() {
    const file = await promises_1.default.readFile(contactsPath, "utf-8");
    const result = JSON.parse(file);
    return result;
}
exports.listContacts = listContacts;
async function getContactById(contactId) {
    const contacts = await listContacts();
    const foundContact = contacts.find(({ id }) => id === contactId);
    return foundContact;
}
exports.getContactById = getContactById;
async function removeContact(contactId) {
    const contacts = await listContacts();
    const newContactsDataList = contacts.filter(({ id }) => id !== contactId);
    promises_1.default.writeFile(contactsPath, JSON.stringify(newContactsDataList));
    return newContactsDataList;
}
exports.removeContact = removeContact;
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const contact = { id: (0, nanoid_1.nanoid)(4), name, email, phone };
    contacts.push(contact);
    promises_1.default.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
}
exports.addContact = addContact;
module.exports = { listContacts, getContactById, removeContact, addContact };
