let allNotes = {
    'notes':[],
    'notesTitles':[],
    'trashNotes':[],
    'trashNotesTitles':[],
    'archivNotes':[],
    'archivNotesTitles':[],
}

function unit() {
    getFromLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderArchivNotes();
}

function moveNote(indexNote, startKey, destinationKey) {
    let note = allNotes[startKey].splice(indexNote, 1); 
    allNotes[destinationKey].push(note[0]); 
    let noteTitle = allNotes[startKey + "Titles"].splice(indexNote, 1); 
    allNotes[destinationKey + "Titles"].push(noteTitle[0]); 
    
    renderAllsNotes();
}

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);   
    }
}

function renderTrashNotes() { 
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < allNotes.trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote); 
    }
}

function renderArchivNotes() { 
    let archivContentRef = document.getElementById('archiv_content');
    archivContentRef.innerHTML = "";

    for (let indexArchivNote = 0; indexArchivNote < allNotes.archivNotes.length; indexArchivNote++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}

function getNoteTemplate(indexNote) { 
    return `<p>+ title: ${allNotes.notesTitles[indexNote]} -> ${allNotes.notes[indexNote]} <button onclick ="moveNote(${indexNote}, 'notes', 'archivNotes')">A</button><button onclick ="moveNote(${indexNote},'notes','trashNotes')">X</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {  
    return `<p>+ title: ${allNotes.trashNotesTitles[indexTrashNote]} -> ${allNotes.trashNotes[indexTrashNote]} <button onclick ="moveNote(${indexTrashNote},'trashNotes','archivNotes')">A</button><button onclick ="deleteTrashNote(${indexTrashNote})">X</button></p>`;
}

function getArchivNoteTemplate(indexArchivNote) { 
    return `<p>+ title: ${allNotes.archivNotesTitles[indexArchivNote]} -> ${allNotes.archivNotes[indexArchivNote]} <button onclick ="deleteNote(${indexArchivNote})">X</button><button onclick ="moveNote(${indexArchivNote},'archivNotes','trashNotes')">P</button></p>`;
}

function addNote(destinationKey) {
    let noteInputRef = document.getElementById('note_input');
    let noteInput = noteInputRef.value;
    let titleInputRef = document.getElementById('title_input');
    let titleInput = titleInputRef.value;
    if (noteInputRef.value != "") {
        allNotes.notes.push(noteInput);
    }
    if (titleInputRef.value != "") {
        allNotes.notesTitles.push(titleInput);
    }
    saveToLocalStorage();
    renderNotes();
    noteInputRef.value = "";
    titleInputRef.value = "";
}

function deleteTrashNote(indexTrashNote) { 
    allNotes.trashNotes.splice(indexTrashNote, 1);
    allNotes.trashNotesTitles.splice(indexTrashNote, 1);
    
    renderAllsNotes();
}

function deleteNote(indexArchivNote) { 
    allNotes.archivNotes.splice(indexArchivNote, 1);
    allNotes.archivNotesTitles.splice(indexArchivNote, 1);
   
    renderAllsNotes();
}

function saveToLocalStorage() {
    localStorage.setItem("myNotes", JSON.stringify(allNotes.notes));
    localStorage.setItem("myNotesTitle", JSON.stringify(allNotes.notesTitles));
    localStorage.setItem("myNotesTrash", JSON.stringify(allNotes.trashNotes));
    localStorage.setItem("myNotesTrashTitle", JSON.stringify(allNotes.trashNotesTitles));
    localStorage.setItem("myNotesArchiv", JSON.stringify(allNotes.archivNotes));
    localStorage.setItem("myNotesArchivTitle", JSON.stringify(allNotes.archivNotesTitles));
}

function getFromLocalStorage() {
    let myArrNotes = JSON.parse(localStorage.getItem("myNotes"));
    let myArrNotesTitle = JSON.parse(localStorage.getItem("myNotesTitle"));
    let myArrTrash = JSON.parse(localStorage.getItem("myNotesTrash"));
    let myArrTrashTitle = JSON.parse(localStorage.getItem("myNotesTrashTitle"));
    let myArrArchiv = JSON.parse(localStorage.getItem("myNotesArchiv"));
    let myArrArchivTitle = JSON.parse(localStorage.getItem("myNotesArchivTitle"));
    
    if (myArrNotes != null) {
        allNotes.notes = myArrNotes;
    }
    if (myArrNotesTitle != null) {
        allNotes.notesTitles = myArrNotesTitle;
    }
    if (myArrTrash != null) {
        allNotes.trashNotes = myArrTrash;
    }
    if (myArrTrashTitle != null) {
        allNotes.trashNotesTitles = myArrTrashTitle;
    }
    if (myArrArchiv != null) {
        allNotes.archivNotes = myArrArchiv;
    }
    if (myArrArchivTitle != null) {
        allNotes.archivNotesTitles = myArrArchivTitle;
    }
}

function renderAllsNotes() {
    renderNotes(); 
    renderTrashNotes(); 
    renderArchivNotes(); 
    saveToLocalStorage();
}
