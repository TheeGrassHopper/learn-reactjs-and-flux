import Firebase from 'firebase';
import AppActions from '../actions/AppActions';

export function saveContact(contact) {
  let firebaseRef = new Firebase('https://educontactlist.firebaseio.com/contacts');
  firebaseRef.push({contact});
}
export function removeContact(contactId) {
  let firebaseRef = new Firebase('https://educontactlist.firebaseio.com/contacts/' + contactId);
  firebaseRef.remove();
}
export function updateContact(contact) {
  const updatedContact = {
    name: contact.name,
    phone: contact.phone,
    email: contact.email
  };
  let firebaseRef = new Firebase('https://educontactlist.firebaseio.com/contacts/' + contact.id + '/contact');
  firebaseRef.update(updatedContact);
}
export function getContacts() {
  let firebaseRef = new Firebase('https://educontactlist.firebaseio.com/contacts');
  firebaseRef.once("value", (snapshot) => {
    let contacts = [];
    snapshot.forEach((childSnapshot) => {
      let contact = {
        id: childSnapshot.key(),
        name: childSnapshot.val().contact.name,
        phone: childSnapshot.val().contact.phone,
        email: childSnapshot.val().contact.email
      };
      contacts.push(contact);
    });
    AppActions.receiveContacts(contacts);
  });
}