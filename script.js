const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click", function() {
    addNote();
});

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;

    const deleteIcon = note.querySelector(".trash");
    deleteIcon.addEventListener("click", function() {
        note.remove();
        saveNotes();
    });

    const textarea = note.querySelector("textarea");
    textarea.addEventListener("input", function() {
        saveNotes();
    });

    main.appendChild(note);
    saveNotes();
};

(function() {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if (lsNotes === null) {
        addNote();
    } else {
        lsNotes.forEach((lsNote) => {
            addNote(lsNote);
        });
    }
})();
