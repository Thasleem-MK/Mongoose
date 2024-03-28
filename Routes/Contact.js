const express = require("express");
const routes = express.Router();
const contact = require("../Models/Contact");

routes.post("/contact", async (req, res) => {
  try {
    const newContact = new contact(req.body);
    await newContact
      .save()
      .then((savedContact) => {
        console.log(savedContact);
        res.status(201).json({ msg: "Contact saved successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to create new contact" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to save new contact" });
  }
});

//get all contact

routes.get("/contact", async (req, res) => {
  try {
    contact
      .find()
      .then((contacts) => {
        console.log(contacts);
        res.status(200).json({ Contacts: contacts });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to get contacts" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to get contacts" });
  }
});

//get one contact by its ID
routes.get("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    contact
      .findById(id)
      .then((contact) => {
        console.log(contact);
        res.status(200).json({ Contact: contact });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to find contact in the given id" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to find contact in the given id" });
  }
});

//serch method

routes.get("/contacts/search", async (req, res) => {
  try {
    const serchTerm = req.query.serchTerm;
    const serchRegex = RegExp(serchTerm, "i");

    await contact
      .find({
        $or: [
          { firstName: serchRegex },
          { lastName: serchRegex },
          { email: serchRegex },
        ],
      })
      .then((contacts) => {
        console.log(contacts);
        res.status(200).json({ contact: contacts });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to find the contact" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No contact found" });
  }
});

module.exports = routes;
