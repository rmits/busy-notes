const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');

//get request
//parses the database, then jsons it to display the notes
router.get('/api/notes', async (req, res) => {
    const jsonDB = await JSON.parse(fs.readFileSync('db/db.json'));
    res.json(jsonDB);
});

//post request
router.post('/api/notes', async (req,res) => {
    try{
    //parses the database
    const jsonDB = await JSON.parse(fs.readFileSync("db/db.json"));
    
    //new notes, filling the new object with user input request
    //id is a random generated number
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id:  uuid(),
    };

    //pushes the new object into the parsed database
    //then writes it back in string, then displays it in json for user
    jsonDB.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(jsonDB));
    res.json(jsonDB);
} catch (err) {
    console.log(err);
    res.status(500).json({Message: "Internal Server Error"});
}
});

router.delete('/api/notes/:id', async (req, res) => {
    try {
    //create a const for the req id, parse the db
      const noteId = req.params.id;
      const jsonDB = JSON.parse(fs.readFileSync('db/db.json'));
  
      //find the index of the note with the given ID in the JSON database
      const noteIndex = jsonDB.findIndex((note) => note.id === noteId);
  
      if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // Remove the note from the JSON database
      jsonDB.splice(noteIndex, 1);
  
      // Write the updated JSON database back to the file
      fs.writeFileSync('db/db.json', JSON.stringify(jsonDB, null, 2));
  
      return res.json({ message: 'Note deleted successfully' });
    } catch (err) {
      console.error('Error deleting note:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;