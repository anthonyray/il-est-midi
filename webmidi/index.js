var activeNotes = []; // the stack of actively-pressed keys

WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

  var input = WebMidi.getInputByName("LPK25");
  
  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      activeNotes.push(e.note)
      displayNotes(activeNotes)
    }
  );

  input.addListener('noteoff', "all",
    function (e) {
      activeNotes = _.reject(activeNotes, function(note){ return note.number == e.note.number})
      displayNotes(activeNotes)
    }
  );

});

function displayNotes(notes){
  var notesText = _.reduce(notes, function(notesString, note) {
  return notesString + note.name + note.octave + " "; }, "")
  $("#notes").text("").text(notesText)
}