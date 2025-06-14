import notes from '../data.json'
import {
    updateNote, newNoteRequest
} from "../utility";
// console.log(notes, 'Rashwan Open Me Please!');

export async function addData(setActive) {
    // console.log(notes.notes);
    let nd = notes.notes;
    nd.forEach(async (note, index) => {
        const { title, content, lastEdited, tags, isArchived } = note;
        await newNoteRequest(setActive);
        await updateNote()
    })

} 