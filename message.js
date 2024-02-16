class Message {
  // Write code here!
  constructor(name, commands = []) {
    this.name = name;
    if (!name) {
      throw Error("Name message required.");
    }
    this.commands = commands;
  }
}


module.exports = Message; 