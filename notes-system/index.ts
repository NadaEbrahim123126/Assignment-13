export {};

class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    private password: string,
    public phone: string,
    private _age: number
  ) {
    this.age = _age;
  }

protected notebooks: NoteBook[] = [];

addNotebook(notebook: NoteBook): void {
  this.notebooks.push(notebook);
}

getNotebooks(): NoteBook[] {
  return this.notebooks;
}

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = value;
  }

  displayInfo(): void {
    console.log(`${this.id} | ${this.name} | ${this.email} | ${this.phone} | ${this.age}`);
  }
}

const user = new User(1, "Nada", "NadaEbrahim@mail.com", "2311", "010", 20);
user.displayInfo();

class Admin extends User {
  manageNotes(): void {
    console.log("Admin is managing notes");
  }
}
const admin = new Admin(2, "Sara", "sara@mail.com", "admin1", "011", 18);
admin.displayInfo();
admin.manageNotes();

class Note {
  constructor(
    public readonly id: number,
    public title: string,
    public content: string,
    public readonly author: User
  ) {}

  preview(length: number = 20): string {
    return this.content.length > length
      ? this.content.slice(0, length) + "..."
      : this.content;
  }
}
const note = new Note(1, "TS", "TypeScript is a typed superset of JavaScript", user);
console.log(note.preview());
console.log(note.author.name);

class NoteBook {
  private notes: Note[] = [];
  private nextId = 1;

  constructor(public title: string) {}

  addNote(title: string, content: string, author: User): Note {
    const note = new Note(this.nextId++, title, content, author);
    this.notes.push(note);
    return note;
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter((n) => n.id !== noteId);
  }

  getNotes(): Note[] {
    return [...this.notes];
  }
}

class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

const nb = new NoteBook("Study");
nb.addNote("A", "first note content", user);
nb.addNote("B", "second note content", user);
console.log(nb.getNotes().length);

nb.removeNote(1);
console.log(nb.getNotes().length);

user.addNotebook(nb);
console.log(user.getNotebooks().length);
console.log(user.getNotebooks()[0]?.title);

const nums = new Storage<number>();
nums.addItem(10);
nums.addItem(20);
nums.removeItem(10);
console.log(nums.getAllItems());

const names = new Storage<string>();
names.addItem("Shorouk");
console.log(names.getAllItems());
