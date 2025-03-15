let allNotes = {
    'notes':['Banana', 'Kerne'],
    'notesTitles':['essen', 'spucken'],
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

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);   
    }
}

function renderTrashNotes() { 
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote); 
    }
}

function renderArchivNotes() { 
    let archivContentRef = document.getElementById('archiv_content');
    archivContentRef.innerHTML = "";

    for (let indexArchivNote = 0; indexArchivNote < archivNotes.length; indexArchivNote++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}

function getNoteTemplate(indexNote) { 
    return `<p>+ title: ${notesTitles[indexNote]} -> ${notes[indexNote]} <button onclick =" pushFromNotesToArchiv(${indexNote})">A</button><button onclick ="pushToTrash(${indexNote})">X</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {  
    return `<p>+ title: ${trashNotesTitles[indexTrashNote]} -> ${trashNotes[indexTrashNote]} <button onclick ="pushToArchiv(${indexTrashNote})">A</button><button onclick ="deleteTrashNote(${indexTrashNote})">X</button></p>`;
}

function getArchivNoteTemplate(indexArchivNote) { 
    return `<p>+ title: ${archivNotesTitles[indexArchivNote]} -> ${archivNotes[indexArchivNote]} <button onclick ="deleteNote(${indexArchivNote})">X</button><button onclick ="pushBackToTrash(${indexArchivNote})">P</button></p>`;
}

function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let noteInput = noteInputRef.value;
    let titleInputRef = document.getElementById('title_input');
    let titleInput = titleInputRef.value;
    if (noteInputRef.value != "") {
        notes.push(noteInput);
    }
    if (titleInputRef.value != "") {
        notesTitles.push(titleInput);
    }
    saveToLocalStorage();
    renderNotes();
    noteInputRef.value = "";
    titleInputRef.value = "";
}

function pushToTrash(indexNote) {
    let trashNote = notes.splice(indexNote, 1); 
    trashNotes.push(trashNote); 
    let trashNoteTitle = notesTitles.splice(indexNote, 1); 
    trashNotesTitles.push(trashNoteTitle); 
    
    renderAllsNotes();
}

function pushBackToTrash(indexArchivNote) { 
    let archivNote = archivNotes.splice(indexArchivNote, 1); 
    trashNotes.push(archivNote); 
    let archivNoteTitle = archivNotesTitles.splice(indexArchivNote, 1); 
    trashNotesTitles.push(archivNoteTitle);
    
    renderAllsNotes();
}

function pushToArchiv(indexTrashNote) { 
    let archivNote = trashNotes.splice(indexTrashNote, 1); 
    archivNotes.push(archivNote); 
    let archivNoteTitle = trashNotesTitles.splice(indexTrashNote, 1); 
    archivNotesTitles.push(archivNoteTitle);
    
    renderAllsNotes();
}

function pushFromNotesToArchiv(indexNote) { 
    let archivNote = notes.splice(indexNote, 1); 
    archivNotes.push(archivNote); 
    let archivNoteTitle = notesTitles.splice(indexNote, 1); 
    archivNotesTitles.push(archivNoteTitle); 
    
    renderAllsNotes();
}

function deleteTrashNote(indexTrashNote) { 
    trashNotes.splice(indexTrashNote, 1);
    trashNotesTitles.splice(indexTrashNote, 1);
    
    renderAllsNotes();
}

function deleteNote(indexArchivNote) { 
    archivNotes.splice(indexArchivNote, 1);
    archivNotesTitles.splice(indexArchivNote, 1);
   
    renderAllsNotes();
}

function saveToLocalStorage() {
    localStorage.setItem("myNotes", JSON.stringify(notes));
    localStorage.setItem("myNotesTitle", JSON.stringify(notesTitles));
    localStorage.setItem("myNotesTrash", JSON.stringify(trashNotes));
    localStorage.setItem("myNotesTrashTitle", JSON.stringify(trashNotesTitles));
    localStorage.setItem("myNotesArchiv", JSON.stringify(archivNotes));
    localStorage.setItem("myNotesArchivTitle", JSON.stringify(archivNotesTitles));
}

function getFromLocalStorage() {
    let myArrNotes = JSON.parse(localStorage.getItem("myNotes"));
    let myArrNotesTitle = JSON.parse(localStorage.getItem("myNotesTitle"));
    let myArrTrash = JSON.parse(localStorage.getItem("myNotesTrash"));
    let myArrTrashTitle = JSON.parse(localStorage.getItem("myNotesTrashTitle"));
    let myArrArchiv = JSON.parse(localStorage.getItem("myNotesArchiv"));
    let myArrArchivTitle = JSON.parse(localStorage.getItem("myNotesArchivTitle"));
    
    if (myArrNotes != null) {
        notes = myArrNotes;
    }
    if (myArrNotesTitle != null) {
        notesTitles = myArrNotesTitle;
    }
    if (myArrTrash != null) {
        trashNotes = myArrTrash;
    }
    if (myArrTrashTitle != null) {
        trashNotesTitles = myArrTrashTitle;
    }
    if (myArrArchiv != null) {
        archivNotes = myArrArchiv;
    }
    if (myArrArchivTitle != null) {
        archivNotesTitles = myArrArchivTitle;
    }
}

function renderAllsNotes() {
    renderNotes(); 
    renderTrashNotes(); 
    renderArchivNotes(); 
    saveToLocalStorage();
}
